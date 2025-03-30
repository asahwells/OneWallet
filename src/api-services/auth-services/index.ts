import { useMutation } from "@tanstack/react-query";
import { BASE_AXIOS, HttpClient } from "../http";
import Cookies from "js-cookie";
import { useToast } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import {StorageToken} from "../../constants/token";
import {ILoginPayload, IAuthRes, IResetPasswordPayload, IVerifyPayload} from "./interface";
import {setIsAuthenticated, setUserState} from "../../redux/slices/user";
import { IResp } from "api-services/interfaces";

export const useLogin = () => {
    const customToast = useToast();

    return useMutation({
        mutationFn: (data: ILoginPayload): Promise<IAuthRes> =>
            HttpClient.post(BASE_AXIOS, { url: "sales-agent/auth/login", data }),
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

export const useResetPassword = (onSuccessCallback: () => void, onErrorCallback: () => void) => {
    return useMutation({
        mutationFn: (data: IResetPasswordPayload): Promise<IResp> =>
            HttpClient.post(BASE_AXIOS, { url: "sales-agent/auth/change-password", data }),
        onSuccess: (res: IResp) => {
            onSuccessCallback();  // Trigger Success Modal
            return res;
        },
        onError: (error: any) => {
            onErrorCallback();  // Trigger Failed Modal
            throw new Error(error?.response?.data?.message || "Reset Password failed. Please try again.");
        },
    });
};

const useVerificationMutation = (endpoint: string) => {
    const customToast = useToast();

    return useMutation({
        mutationFn: (data: IVerifyPayload): Promise<IAuthRes> =>
            HttpClient.post(BASE_AXIOS, { url: endpoint, data }),

        onSuccess: (res: IAuthRes) => {
            Cookies.set(StorageToken, res.token);
        },

        onError: (error: any) => {
            customToast({
                status: "error",
                title: "Error",
                description:
                    error?.response?.data?.message ||
                    "You entered a wrong OTP. The Account will be locked for 3 hours after 4 more attempts.",
            });

            throw new Error(
                error?.response?.data?.message ||
                "You entered a wrong OTP. The Account will be locked for 3 hours after 4 more attempts."
            );
        },
    });
};

// TODO : DYnamically pass the correct endpoint
export const usePhoneNumberVerification = () => useVerificationMutation("auth/login");
export const useOtpVerification = () => useVerificationMutation("auth/login");
