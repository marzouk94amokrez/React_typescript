
import axios, { AxiosInstance } from "axios"
import { API_URL } from "@/utils/const";
import { useMemo } from "react";
import { useLogger } from "./loggerService";
import { useAuth } from "./contexts/app";

// Current instance
let httpInstance: AxiosInstance | undefined = undefined;

/**
 * Http Client service
 * @returns 
 */
export function useHttp() {
  const { logout } = useAuth();
  const { logger } = useLogger();

  const http = useMemo(() => {
    if (httpInstance !== undefined) {
      return httpInstance;
    }

    const axiosInstance = axios.create({
      baseURL: API_URL
    });

    axiosInstance.interceptors.response.use((response) => {
      return response.data
    }, async function (error) {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        logger.warn(`Renvoi de la requête après réception d'un retour 401`);
        return axiosInstance(originalRequest);
      }

      // Already retried
      if (error.response.status === 401 && originalRequest._retry) {
        logger.warn(`Erreur de la requête après tentative. Logout.`);
        logout();
      }

      return Promise.reject(error);
    });

    httpInstance = axiosInstance;
    return axiosInstance;
  }, [logout]);

  return { http };
}
