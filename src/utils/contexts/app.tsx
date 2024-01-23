import { Provider } from 'react-redux';
import { useToken } from '@/utils/tokenService';
import { logger, useLogger } from '@/utils/loggerService';
import store from "@/store";
import { useContext } from "react";
import { AuthContext, IAuthContext } from 'react-oauth2-code-pkce';

export default function AppContextProvider({children}:any) {
   return (
      <Provider store={store}>
          {children}
      </Provider>
   );
}

/**
 * Encapsulate login & logout for uniformization
 */
export function useAuth() {
  const authService = useContext<IAuthContext>(AuthContext);
  const { logger } = useLogger();

  /**
   * Handle login
   */
  const login = () => {
    logger.debug(`Tentative d'authentification en utilisant`);
    authService.login();
    const token = authService.loginInProgress ? '' : authService.token;

    if (!token) {
      logger.warn(`Erreur d'obtention du token`);
    }
  }

  /**
   * Handle logout
   */
  const logout = () => {
   
    authService.logOut();
  }

  return { login, logout, authService }
}
