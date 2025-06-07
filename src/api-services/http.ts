import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import Cookies from "js-cookie";
import {StorageToken} from "../constants/token";

export const BASE_AXIOS = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    timeout: 50000,
    headers: {
        Accept: "application/json",
    },
});


const requestConfig = (config: AxiosRequestConfig) => {
    const token = Cookies.get(StorageToken);
  console.log(process.env.NEXT_PUBLIC_BASE_URL)

    return {
        ...config,
        headers: {
            ...config.headers,
            Authorization: token
        },
    };
};

const responseErrorConfig = (error: any) => {
    console.warn({error})
    if (
        window.location.pathname !== "/auth/sign-in" &&
        (error.response.status === 403 || error.response.status === 401)
    ) {
        Cookies.remove(StorageToken);

        //clear local storage
        sessionStorage.clear()
        window.location.href = "/auth/sign-in";
    }
    return Promise.reject(error);
};

BASE_AXIOS.interceptors.request.use(
    // @ts-ignore
    requestConfig,
    (error) => {
        return Promise.reject(error);
    }
);

BASE_AXIOS.interceptors.response.use((response) => {
    return response;
}, responseErrorConfig);

export class HttpClient {
    private static async request<T>(
        axiosInstance: AxiosInstance,
        config: AxiosRequestConfig
    ): Promise<T> {
        const response = await axiosInstance.request<T>(config);
        return response.data;
    }

    static async get<T>(
        axiosInstance: AxiosInstance,
        { url, params }: { url: string; params?: unknown }
    ): Promise<T> {
        return this.request<T>(axiosInstance, { method: "get", url, params });
    }

    static async post<T>(
        axiosInstance: AxiosInstance,
        {
            url,
            data,
            options,
        }: { url: string; data: unknown; options?: AxiosRequestConfig }
    ): Promise<T> {
        return this.request<T>(axiosInstance, {
            method: "post",
            url,
            data,
            ...options,
        });
    }

    static async put<T>(
        axiosInstance: AxiosInstance,
        { url, data }: { url: string; data: unknown }
    ): Promise<T> {
        return this.request<T>(axiosInstance, { method: "put", url, data });
    }

    static async patch<T>(
        axiosInstance: AxiosInstance,
        { url, data }: { url: string; data?: unknown }
    ): Promise<T> {
        return this.request<T>(axiosInstance, { method: "patch", url, data });
    }

    static async del<T>(
        axiosInstance: AxiosInstance,
        { url }: { url: string }
    ): Promise<T> {
        return this.request<T>(axiosInstance, { method: "delete", url });
    }
}