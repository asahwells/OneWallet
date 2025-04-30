import { useMutation } from "@tanstack/react-query";
import { BASE_AXIOS, HttpClient } from "api-services/http";
import { IAddNextOfKinPayload, ICustomerBankInfoResponse, ICustomerInfoRes, ICustomersInfoRes, ITierThreeUpgradePayload, ITierTwoUpgradePayload, ITransactionDetailsRes, ITransactionsInfoRes, ITransactionsOverviewRes } from "./interface";
import { useToast } from "@chakra-ui/react";
import { IResponse } from "api-services/business-registration-services/interface";

// api-services/business-services.ts
export const useFetchAllCustomers = () => {
    return useMutation({
      mutationFn: ({ page, pageSize }: { page: number; pageSize: number }): Promise<ICustomersInfoRes> =>
        HttpClient.get(BASE_AXIOS, {
          url: `sales-agent/customers?page=${page}&limit=${pageSize}`,
        }),
    });
  };
  

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

export const useFetchAllTransactions = (id: string) => {
  return useMutation<ITransactionsInfoRes, Error, { page: number; month: string }>({
    mutationFn: ({ page, month }): Promise<ITransactionsInfoRes> => {
      const params: { page: number; month?: string } = { page };

      if (month) {
        params.month = month; 
      }

      return HttpClient.get<ITransactionsInfoRes>(BASE_AXIOS, {
        url: `sales-agent/customers/${id}/transactions`,
        params: params,
      });
    },
    onSuccess: (res: ITransactionsInfoRes) => {
      return res;
    },
  });
};

export const useFetchTransactionsOverview = (id: string) => {
  return useMutation<ITransactionsOverviewRes, Error>({
    mutationFn: (): Promise<ITransactionsOverviewRes> => {

      return HttpClient.get<ITransactionsOverviewRes>(BASE_AXIOS, {
        url: `sales-agent/customers/${id}/transactions/overview`,
        //params: params,
      });
    },
    onSuccess: (res: ITransactionsOverviewRes) => {
      return res;
    },
  });
};

export const useFetchSingleTransaction = (id: string, TId: string) => {
  return useMutation<ITransactionDetailsRes, Error>({
    mutationFn: (): Promise<ITransactionDetailsRes> => {

      return HttpClient.get<ITransactionDetailsRes>(BASE_AXIOS, {
        url: `sales-agent/customers/${id}/transactions/${TId}`,
        //params: params,
      });
    },
    onSuccess: (res: ITransactionDetailsRes) => {
      return res;
    },
  });
};


  
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

export const useUpgradeTierThree = () => {
  return useMutation({
    mutationFn: (data: ITierThreeUpgradePayload): Promise<IResponse> =>
        HttpClient.post(BASE_AXIOS, { url: "sales-agent/upgrade-account/tier-three", data }),
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
