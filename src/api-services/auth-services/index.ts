import { useMutation } from "@tanstack/react-query";
import { BASE_AXIOS, HttpClient } from "../http";
import Cookies from "js-cookie";
import { useToast } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import {StorageToken} from "../../constants/token";
import {ILoginPayload, IAuthRes, IResetPasswordPayload, IVerifyPayload, ILoginInfoRes} from "./interface";
import {setIsAuthenticated, setUserState} from "../../redux/slices/user";
import { IResp } from "api-services/interfaces";

export const useLogin = () => {
  console.log('BASE_AXIOS' )
    console.log(process.env.NEXT_PUBLIC_BASE_URL, 'llllll')

    const customToast = useToast();
    const dispatch = useDispatch();

    return useMutation({
        mutationFn: (data: ILoginPayload): Promise<ILoginInfoRes> =>
            HttpClient.post(BASE_AXIOS, { url: "sales-agent/auth/login", data }),
        onSuccess: (res: ILoginInfoRes) => {
            Cookies.set(StorageToken, res.token);
            return res;
        },
        onError: (error: any) => {
            // customToast({
            //    status: "error",
            //     description: error?.response?.data?.message || "Login failed. Please try again.",
            //     title: "Error",

            // });

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

export const usePhoneNumberVerification = () => {
    const customToast = useToast();
    const dispatch = useDispatch();

    return useMutation({
        mutationFn: (data: IVerifyPayload): Promise<IAuthRes> =>
            HttpClient.post(BASE_AXIOS, { url: "sales-agent/auth/verify-phone", data }),
        onSuccess: (res: IAuthRes) => {
            Cookies.set(StorageToken, res.token);
            return res;
        },
        onError: (error: any) => {
            customToast({
               status: "error",
                description: error?.response?.data?.message || "You entered a wrong OTP.",
                title: "Error",

            });

            throw new Error(error?.response?.data?.message || "You entered a wrong OTP.");
        },
    });
};

export const useResendOTP = () => {
    const customToast = useToast();

    return useMutation({
        mutationFn: (data: IVerifyPayload): Promise<IAuthRes> =>
            HttpClient.post(BASE_AXIOS, { url: "sales-agent/auth/resend-phone-otp", data }),
        onSuccess: (res: IAuthRes) => {
            customToast({
                status: "success",
                description: "OTP resent successfully.",
                title: "Success",
            });
            return res;
        },
        onError: (error: any) => {
            customToast({
               status: "error",
                description: error?.response?.data?.message || "Something went wrong. Please try again.",
                title: "Error",

            });

            throw new Error(error?.response?.data?.message || "Something went wrong. Please try again.");
        },
    });
};