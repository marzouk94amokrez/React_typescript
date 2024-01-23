import { AuthProvider, TAuthConfig, TRefreshTokenExpiredEvent } from "react-oauth2-code-pkce"
import { useAuth } from '@/utils/contexts/app';
import { logger, useLogger } from '@/utils/loggerService';
import { useToken } from '@/utils/tokenService';
import { Navigate, useLocation } from 'react-router';
import { useEffect } from "react";
import { useAppSelector } from "@/hooks/store";
import {useGetUserQuery} from "@/store/api";
import { setCurrentUser } from '@/store/authSlice';
import { useAppDispatch } from '@/hooks/store';
/**
 * Get application scopes
 */
const getScopes = () => {
  try {
    const scope = JSON.parse(process.env.REACT_APP_SCOPES || '') || ['openid', 'profile'];
    return Array.from(scope).join(' ');
  } catch (e) {
    return 'openid profile';
  }
}

const RouteChildren = ({ children }: any) => { 
  const { authService, login } = useAuth();
  const location = useLocation();
  const token = useAppSelector((state) => state.auth.token);
  const { setToken } = useToken();
  const dispatch = useAppDispatch();
  const {
    data: objectDataUser,
    isLoading,
    isSuccess,
    isError,
    error,
    refetch,

  } = useGetUserQuery(
    { token: token},
    { skip: token === ""  }
  );
  useEffect(() => {
    dispatch(setCurrentUser(objectDataUser?.data?.records))
  }, [objectDataUser]);
  useEffect(() => {
    if (!authService.loginInProgress) {
      setToken({ token: authService.token, tokenContents: authService.tokenData });   
    }
  }, [authService?.token]);

  if (!authService.token && !authService.loginInProgress) {
    login()
    return <></>
  }

  if (!token) {
    return <></>
  }

  const redirectUri = localStorage.getItem('redirectUri');
  if (redirectUri && redirectUri !== location.pathname) {
    logger.debug(`[PROTECTED ROUTE] - L'url de redirection est renseignée. Redirection vers ${redirectUri}.`);
    return <Navigate to={redirectUri} />
  } else if (redirectUri === location.pathname) {
    logger.debug(`[PROTECTED ROUTE] - Nettoyage de l'URL de redirection après navigation.`);
    localStorage.removeItem('redirectUri');
  }

  return <>{children}</>;
}
  /**
   * <b>Composant pour bien protégér les routes en cas de problème d'authentification ou fausses informations envoyées</b>
   */
const ProtectedRoutes = ({ children }: any) => {
  const { logger } = useLogger();
  const location = useLocation();
  /**
   * Authentication service config
   */
  const authConfig: TAuthConfig = {
    clientId: process.env.REACT_APP_CLIENT_ID || '',
    authorizationEndpoint: process.env.REACT_APP_AUTHORIZATION_ENDPOINT || '',
    tokenEndpoint: process.env.REACT_APP_TOKEN_ENDPOINT || '',
    logoutEndpoint: process.env.REACT_APP_LOGOUT_ENDPOINT || '',
    redirectUri: process.env.REACT_APP_REDIRECT_URI || window.location.origin,
    scope: getScopes(),
    //tokenExpiresIn: ((int)process.env.REACT_APP_TOKEN_EXPIRES_SECONDS) || 600,
    autoLogin: false,
    onRefreshTokenExpire: (event: TRefreshTokenExpiredEvent) => {
      logger.debug('[AuthProvider] - Refresh token expired');
    },
    preLogin: () => {
      localStorage.setItem('preLoginUri', location.pathname);
    },
    postLogin: () => {
      const redirectUri = localStorage.getItem('preLoginUri') || '';
      logger.debug(`Post login, sauvegarde de l'URL de redirection à ${redirectUri}.`);
      localStorage.setItem('redirectUri', redirectUri);
      localStorage.removeItem('preLoginUri');
    }
  };

  return <AuthProvider authConfig={authConfig}>
    <RouteChildren>
      {children}
    </RouteChildren>
  </AuthProvider>;
}

export default ProtectedRoutes;
