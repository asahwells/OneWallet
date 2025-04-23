import { useMutation } from "@tanstack/react-query";
import { BASE_AXIOS, HttpClient } from "api-services/http";
import { IAddNextOfKinPayload, ICustomerBankInfoResponse, ICustomerInfoRes, ICustomersInfoRes, ITierTwoUpgradePayload, ITransactionsInfoRes } from "./interface";
import { useToast } from "@chakra-ui/react";
import { IResponse } from "api-services/business-registration-services/interface";

export const useFetchAllCustomers = () => {
  
    return useMutation({
        mutationFn: (): Promise<ICustomersInfoRes> => {
           return HttpClient.get(BASE_AXIOS, { url: `sales-agent/customers` })
        },
        onSuccess: (res: ICustomersInfoRes) => {
          return res;
        },
    });
}

export const useFetchCustomer = (id: string) => {
  
    return useMutation({
        mutationFn: (): Promise<ICustomerInfoRes> => {
           return HttpClient.get(BASE_AXIOS, { url: `sales-agent/customers/${id}` })
        },
        onSuccess: (res: ICustomerInfoRes) => {
          return res;
        },
    });
}

export const useFetchAllTransactions = (id:string) => {
  
  return useMutation({
      mutationFn: (): Promise<ITransactionsInfoRes> => {
         return HttpClient.get(BASE_AXIOS, { url: `sales-agent/customers/${id}/transactions` })
      },
      onSuccess: (res: ITransactionsInfoRes) => {
        return res;
      },
  });
}

export const useUpgradeTierTwo = () => {

return useMutation({
    mutationFn: (data: ITierTwoUpgradePayload): Promise<IResponse> =>
        HttpClient.post(BASE_AXIOS, { url: "sales-agent/upgrade-account/tier-two", data }),
    onSuccess: (res: IResponse) => {
        return res;
    },
    onError: (error: any) => {
        throw new Error(
        error?.response?.data?.message || 'Something went wrong. Please try again.'
        );
    },
    }
);
};

export const useAddNextOfKin = () => {
  const toast = useToast();
  
  return useMutation({
      mutationFn: (data: IAddNextOfKinPayload): Promise<IResponse> =>
          HttpClient.post(BASE_AXIOS, { url: "sales-agent/upgrade-account/next-of-kin", data }),
      onSuccess: (res: IResponse) => {
        toast({
          title: "Success",
          description: "Next of kin added successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        })
          return res;
      },
      onError: (error: any) => {
        toast({
            title: "Error",
            description: error?.response?.data?.message || 'Something went wrong. Please try again.',
            status: "error",
            duration: 3000,
            isClosable: true,
        })
          throw new Error(
          error?.response?.data?.message || 'Something went wrong. Please try again.'
          );
      },
      }
  );
  };

export const useGetCustomerAccountInformation = (userId: string) => {
    return useMutation({
        mutationFn: (): Promise<ICustomerBankInfoResponse> => {
            return HttpClient.get(BASE_AXIOS, {url: `sales-agent/customers/account-details?userId=${userId}`});
        },
        onSuccess: (res: ICustomerBankInfoResponse) => {
            return res;
        },
        onError: (error: any) => {
            throw new Error(error?.response?.data?.message || "Failed to fetch customer information.");
        }
    });
}