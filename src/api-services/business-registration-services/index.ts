import { useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { IResponse, IRegistrationPayload, IIdentityResponse, ICategoriesResponse, IBusinessPayload } from "./interface";
import { BASE_AXIOS, HttpClient } from "api-services/http";
import { IAuthRes } from "api-services/auth-services/interface";
import { useDispatch } from "react-redux";

export const useResendOTP = () => {
    const customToast = useToast();
  
    return useMutation({
      // We accept an object (IResendPayload) containing the phone number.
      // Then we call your new endpoint: "sales-agent/onboarding/issue-phone-otp?phone=..."
      mutationFn: async ({ phone }: IRegistrationPayload): Promise<IAuthRes> => {
        return HttpClient.get(BASE_AXIOS, {
          url: `sales-agent/onboarding/issue-phone-otp?phone=${phone}`,
        });
      },
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
          description:
            error?.response?.data?.message || "Something went wrong. Please try again.",
          title: "Error",
        });
        throw new Error(
          error?.response?.data?.message || "Something went wrong. Please try again."
        );
      },
    });
  };

export const useSendPhoneOTP = () => {
const toast = useToast();

return useMutation({
    mutationFn: (data: IRegistrationPayload): Promise<IResponse> =>
        HttpClient.post(BASE_AXIOS, { url: "sales-agent/onboarding/issue-phone-otp", data }),
    onSuccess: (res: IResponse) => {

        return res;
    },
    onError: (error: any) => {
        // toast({
        // title: 'Error',
        // description:
        //     error?.response?.data?.message || 'Something went wrong. Please try again.',
        // status: 'error',
        // duration: 3000,
        // isClosable: true,
        // });
        throw new Error(
        error?.response?.data?.message || 'Something went wrong. Please try again.'
        );
    },
    }
);
};

export const usePhoneNumberVerification = () => {
    const customToast = useToast();
    const dispatch = useDispatch();

    return useMutation({
        mutationFn: (data: IRegistrationPayload): Promise<IResponse> =>
            HttpClient.post(BASE_AXIOS, { url: "sales-agent/onboarding/verify-phone-otp", data }),
        onSuccess: (res: IResponse) => {
            return res;
        },
        onError: (error: any) => {
            // customToast({
            //    status: "error",
            //     description: error?.response?.data?.message || "You entered a wrong OTP.",
            //     title: "Error",

            // });

            throw new Error(error?.response?.data?.message || "You entered a wrong OTP.");
        },
    });
};

export const useAddDateOfBirth = () => {
    const customToast = useToast();

    return useMutation({
        mutationFn: (data: IRegistrationPayload): Promise<IResponse> =>
            HttpClient.post(BASE_AXIOS, { url: "sales-agent/onboarding/add-dob", data }),
        onSuccess: (res: IResponse) => {
            customToast({
            title: 'Success',
            description: 'Successful.',
            status: 'success',
            duration: 3000,
            isClosable: true,
            });
            return res;
        },
        onError: (error: any) => {
            customToast({
               status: "error",
                description: error?.response?.data?.message || "Something went wrong.",
                title: "Error",

            });

            throw new Error(error?.response?.data?.message || "Something went wrong.");
        },
    });
};

export const useVerifyBVN = () => {
    const customToast = useToast();

    return useMutation({
        mutationFn: (data: IRegistrationPayload): Promise<IResponse> =>
            HttpClient.post(BASE_AXIOS, { url: "sales-agent/upgrade-account/tier-one", data }),
        onSuccess: (res: IResponse) => {
            customToast({
            title: 'Success',
            description: 'Successfully verified BVN.',
            status: 'success',
            duration: 3000,
            isClosable: true,
            });
            return res;
        },
        onError: (error: any) => {
            // customToast({
            //    status: "error",
            //     description: error?.response?.data?.message || "Something went wrong.",
            //     title: "Error",

            // });

            throw new Error(error?.response?.data?.message || "Something went wrong.");
        },
    });
};

export const useVerifyNIN = () => {
    const customToast = useToast();

    return useMutation({
        mutationFn: (data: IRegistrationPayload): Promise<IResponse> =>
            HttpClient.post(BASE_AXIOS, { url: "sales-agent/upgrade-account/tier-two", data }),
        onSuccess: (res: IResponse) => {
            customToast({
            title: 'Success',
            description: 'Successfully verified NIN.',
            status: 'success',
            duration: 3000,
            isClosable: true,
            });
            return res;
        },
        onError: (error: any) => {
            // customToast({
            //    status: "error",
            //     description: error?.response?.data?.message || "Something went wrong.",
            //     title: "Error",

            // });

            throw new Error(error?.response?.data?.message || "Something went wrong.");
        },
    });
};

export const useAddAddress = () => {
    const customToast = useToast();

    return useMutation({
        mutationFn: (data: IRegistrationPayload): Promise<IResponse> =>
            HttpClient.post(BASE_AXIOS, { url: "sales-agent/onboarding/add-address", data }),
        onSuccess: (res: IResponse) => {
            customToast({
            title: 'Success',
            description: 'Successfully added address.',
            status: 'success',
            duration: 3000,
            isClosable: true,
            });
            return res;
        },
        onError: (error: any) => {
            // customToast({
            //    status: "error",
            //     description: error?.response?.data?.message || "Something went wrong.",
            //     title: "Error",

            // });

            throw new Error(error?.response?.data?.message || "Something went wrong.");
        },
    });
};

export const useAddEmail = () => {
    const customToast = useToast();

    return useMutation({
        mutationFn: (data: IRegistrationPayload): Promise<IResponse> =>
            HttpClient.post(BASE_AXIOS, { url: "sales-agent/onboarding/issue-email", data }),
        onSuccess: (res: IResponse) => {
            // customToast({
            // title: 'Success',
            // description: 'Successfully.',
            // status: 'success',
            // duration: 3000,
            // isClosable: true,
            // });
            return res;
        },
        onError: (error: any) => {
            // customToast({
            //    status: "error",
            //     description: error?.response?.data?.message || "Something went wrong.",
            //     title: "Error",

            // });

            throw new Error(error?.response?.data?.message || "Something went wrong.");
        },
    });
};

export const useSendEmialOTP = () => {
    const toast = useToast();
    
    return useMutation({
        mutationFn: (data: IRegistrationPayload): Promise<IResponse> =>
            HttpClient.post(BASE_AXIOS, { url: "sales-agent/onboarding/issue-phone-otp", data }),
        onSuccess: (res: IResponse) => {
            // toast({
            // title: 'Success',
            // description: 'OTP sent successfully.',
            // status: 'success',
            // duration: 3000,
            // isClosable: true,
            // });
            return res;
        },
        onError: (error: any) => {
            // toast({
            // title: 'Error',
            // description:
            //     error?.response?.data?.message || 'Something went wrong. Please try again.',
            // status: 'error',
            // duration: 3000,
            // isClosable: true,
            // });
            throw new Error(
            error?.response?.data?.message || 'Something went wrong. Please try again.'
            );
        },
        }
    );
    };
    
    export const useEmailVerification = () => {
        const customToast = useToast();
        const dispatch = useDispatch();
    
        return useMutation({
            mutationFn: (data: IRegistrationPayload): Promise<IResponse> =>
                HttpClient.post(BASE_AXIOS, { url: "sales-agent/onboarding/verify-email", data }),
            onSuccess: (res: IResponse) => {
                return res;
            },
            onError: (error: any) => {
                // customToast({
                //    status: "error",
                //     description: error?.response?.data?.message || "You entered a wrong OTP.",
                //     title: "Error",
    
                // });
    
                throw new Error(error?.response?.data?.message || "You entered a wrong OTP.");
            },
        });
    };

export const useGetIdentity = () => {
  return useMutation({
    mutationFn: (): Promise<IIdentityResponse> => {
      return HttpClient.get(BASE_AXIOS, { url: "sales-agent/upgrade-account/identity?bvn=22222222222"});
    },
    onSuccess: (res: IIdentityResponse) => {
      return res;
    },
    onError: (error: any) => {
      throw new Error(error?.response?.data?.message || "Failed to fetch identity.");
    }
  });
};

export const useFetchIndustries = () => {
  const dispatch = useDispatch();

  return useMutation({
      mutationFn: (): Promise<ICategoriesResponse> => {
          return HttpClient.get(BASE_AXIOS, { url: "sales-agent/onboarding/industry-categories" })
      },
      onSuccess: (res: ICategoriesResponse) => {

      },
  });
}

export const useSetupBusiness = () => {
    const customToast = useToast();

    return useMutation({
        mutationFn: (data: IBusinessPayload): Promise<IResponse> =>
            HttpClient.post(BASE_AXIOS, { url: "sales-agent/onboarding/request-merchant", data }),
        onSuccess: (res: IResponse) => {
            customToast({
            title: 'Success',
            description: 'Successfully setup Business.',
            status: 'success',
            duration: 3000,
            isClosable: true,
            });
            return res;
        },
        onError: (error: any) => {
            customToast({
               status: "error",
                description: error?.response?.data?.message || "Something went wrong.",
                title: "Error",

            });

            throw new Error(error?.response?.data?.message || "Something went wrong.");
        },
    });
};