import {useMutation} from "@tanstack/react-query";
import {BASE_AXIOS, HttpClient} from "../http";

import {IFilterParams, IPendingMerchantRes, IPendingUserRes, ISuspendedMerchantRes, ISuspendedUserRes, ISuspendImageMetadata, ISuspensionHistoryRes, IUpdateSuspendedUserPayload, IUserInfoRes} from "./interfaces";
import { IResp } from "api-services/interfaces";

export const useFetchSuspendedUsers = () => {
  return useMutation({
    mutationFn: (params: IFilterParams): Promise<ISuspendedUserRes> => {
      const { currentPage, fromDate, toDate, tierLevel, search } = params;

      // If search exists
      if (search) {
        return HttpClient.get(BASE_AXIOS, {
          url: `suspended-users/search?q=${search}&currentPage=${currentPage}`
        });
      }

      // Default to the suspended users route if no search query
      let url = `suspended-users?oneWalletUserType=user&currentPage=${currentPage}`;
      if (fromDate) url += `&from=${fromDate}`;
      if (toDate) url += `&to=${toDate}`;
      if (tierLevel) url += `&tier=${tierLevel}`;

      return HttpClient.get(BASE_AXIOS, { url });
    },
    onSuccess: (res: ISuspendedUserRes) => {
      return res;
    },
    onError: (error: any) => {
      throw new Error(error?.response?.data?.message || "Failed to fetch suspended users.");
    }
  });
};


export const useFetchSuspendedMerchants = () => {
  return useMutation({
    mutationFn: (params: IFilterParams): Promise<ISuspendedMerchantRes> => {
      const { currentPage, fromDate, toDate, tierLevel, search } = params;

      // If search exists
      if (search) {
        return HttpClient.get(BASE_AXIOS, {
          url: `suspended-users/search?q=${search}&currentPage=${currentPage}`
        });
      }

      // Default to the suspended merchants route if no search query
      let url = `suspended-users?oneWalletUserType=merchant&currentPage=${currentPage}`;
      if (fromDate) url += `&from=${fromDate}`;
      if (toDate) url += `&to=${toDate}`;
      if (tierLevel) url += `&tier=${tierLevel}`;

      return HttpClient.get(BASE_AXIOS, { url });
    },
    onSuccess: (res: ISuspendedMerchantRes) => {
      return res;
    },
    onError: (error: any) => {
      throw new Error(error?.response?.data?.message || "Failed to fetch suspended merchants.");
    }
  });
};


export const useFetchPendingUsers = () => {
  return useMutation({
    mutationFn: (params: IFilterParams): Promise<IPendingUserRes> => {
      const { currentPage, fromDate, toDate, search } = params;

      // If search exists
      if (search) {
        return HttpClient.get(BASE_AXIOS, {
          url: `tiers/search?q=${search}&currentPage=${currentPage}`
        });
      }

      // Default to the pending users route if no search query
      let url = `tiers/three?status=pending&currentPage=${currentPage}`;
      if (fromDate) url += `&from=${fromDate}`;
      if (toDate) url += `&to=${toDate}`;

      return HttpClient.get(BASE_AXIOS, { url });
    },
    onSuccess: (res: IPendingUserRes) => {
      return res;
    },
    onError: (error: any) => {
      throw new Error(error?.response?.data?.message || "Failed to fetch pending users.");
    }
  });
};



export const useFetchPendingMerchants = () => {
  return useMutation({
    mutationFn: (params: IFilterParams): Promise<IPendingMerchantRes> => {
      const { currentPage, fromDate, toDate, search } = params;

      // If search exists
      if (search) {
        return HttpClient.get(BASE_AXIOS, {
          url: `merchants/search?q=${search}&currentPage=${currentPage}`
        });
      }

      // Default to the pending merchants route if no search query
      let url = `merchants?pending=true&currentPage=${currentPage}`;
      if (fromDate) url += `&from=${fromDate}`;
      if (toDate) url += `&to=${toDate}`;

      return HttpClient.get(BASE_AXIOS, { url });
    },
    onSuccess: (res: IPendingMerchantRes) => {
      return res;
    },
    onError: (error: any) => {
      throw new Error(error?.response?.data?.message || "Failed to fetch pending merchants.");
    }
  });
};


export const useFetchSuspendedUserDetails = (id : string) => {
  return useMutation({
      mutationFn: (): Promise<IUserInfoRes> => HttpClient.get(BASE_AXIOS, { url: `suspended-users/${id}` }),
      onSuccess: (res: IUserInfoRes) => {
        return res
      },
      onError: (error: any) => {
          throw new Error(error?.response?.data?.message || "Failed to fetch suspended user details.");
      }
  });
}

export const useFetchSuspensionHistory = (id : string) => {
  return useMutation({
      mutationFn: (params: IFilterParams): Promise<ISuspensionHistoryRes> => {
        const { duration, durationType } = params;

        return HttpClient.get(BASE_AXIOS, { url: `suspended-users/${id}/history?duration=${duration}&durationType=${durationType}` });
      },
      onSuccess: (res: ISuspensionHistoryRes) => {
        return res
      },
      onError: (error: any) => {
          throw new Error(error?.response?.data?.message || "Failed to fetch suspension history.");
      }
  });
}





export const useReactivateUser = (id: string) => {
  return useMutation({
      mutationFn: (user: string): Promise<IResp> => HttpClient.post(BASE_AXIOS, { url: `suspended-users/${id}/reactivate-user`, data: {user} }),
      onSuccess: (res: IResp) => {
          return res
      },
      onError: (error: any) => {
          throw new Error(error?.response?.data?.message || "Failed to reactivate user.");
      }
  });
}

 export const useFetchUserById = (id: string) => {
    return useMutation({
        mutationFn: (): Promise<ISuspendedUserRes> => HttpClient.get(BASE_AXIOS, { url: `/users/${id}` }),
        onSuccess: (res: ISuspendedUserRes) => {
            return res
        },
        onError: (error: any) => {
            throw new Error(error?.response?.data?.message || "Failed to fetch user.");
        }
    });
 }
