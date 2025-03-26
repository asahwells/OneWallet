import { useMutation } from "@tanstack/react-query";
import { BASE_AXIOS, HttpClient } from "../http";
import Cookies from "js-cookie";
import { useToast } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import {StorageToken} from "../../constants/token";
import {ILoginPayload, IAuthRes} from "./interface";
import {setIsAuthenticated, setUserState} from "../../redux/slices/user";

export const useLogin = () => {
    const customToast = useToast();

    return useMutation({
        mutationFn: (data: ILoginPayload): Promise<IAuthRes> =>
            HttpClient.post(BASE_AXIOS, { url: "auth/login", data }),
        onSuccess: (res: IAuthRes) => {
            // dispatch(setUserState(res));
            Cookies.set(StorageToken, res.token);
        },
        onError: (error: any) => {
            customToast({
               status: "error",
                description: error?.response?.data?.message || "Login failed. Please try again.",
                title: "Error",

            });

            throw new Error(error?.response?.data?.message || "Login failed. Please try again.");
        },
    });
};

export const useFetchLoggedInUser = () => {
    const dispatch = useDispatch();

    return useMutation({
        mutationFn: (): Promise<IAuthRes> => HttpClient.get(BASE_AXIOS, { url: "auth/user" }),
        onSuccess: (res: IAuthRes) => {
            dispatch(setUserState(res));
            dispatch(setIsAuthenticated(true))
        },
    });
}
