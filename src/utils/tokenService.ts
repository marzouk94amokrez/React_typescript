import { useHttp } from './httpClient';
import { useAppDispatch } from '@/hooks/store';
import { setToken as setStoreToken, clearToken as clearStoreToken } from '@/store/authSlice';
import { AccessToken } from './types/accessToken';

/**
 * Token service
 * @returns 
 */
export function useToken() {
  const { http } = useHttp();
  const dispatch = useAppDispatch();

  return { setToken, clearToken };

  function setToken(accessToken: AccessToken) {
    const token = accessToken.token || '';
    http.defaults.headers.common['Authorization'] = (token?.length + token?.indexOf('Bearer ') === 0) ? token : `Bearer ${token}`;

    dispatch(setStoreToken(accessToken));
  }

  function clearToken() {
    http.defaults.headers.common['Authorization'] = ""
    dispatch(clearStoreToken());
  }
}
