import { useMutation } from "@tanstack/react-query";
import { IDashboardGraphRes, IDashboardInfoRes, IUserInfomationRes } from "./interfaces";
import { BASE_AXIOS, HttpClient } from "api-services/http";
import { useDispatch } from "react-redux";
import { setUserState, setIsAuthenticated } from '../../redux/slices/user';

export const useFetchDashboard = () => {
  
    return useMutation({
        mutationFn: async (): Promise<IDashboardInfoRes> => {
           try {
           return HttpClient.get(BASE_AXIOS, { url: "sales-agent/dashboard" })
           } catch (error) {
             console.error('Dashboard API Error:', error);
             throw error;
           }
        },
        onSuccess: (res: IDashboardInfoRes) => {
          return res;
        },
    });
}

export const useFetchDashboardGraph = () => {
  
  return useMutation({
      mutationFn: async (): Promise<IDashboardGraphRes> => {
         try {
         return HttpClient.get(BASE_AXIOS, { url: "sales-agent/dashboard/graph" })
         } catch (error) {
           console.error('Dashboard Graph API Error:', error);
           throw error;
         }
      },
      onSuccess: (res: IDashboardGraphRes) => {
        return res;
      },
  });
}

export const useFetchLoggedInUser = () => {
  const dispatch = useDispatch();

  return useMutation({
      mutationFn: async (): Promise<IUserInfomationRes> => {
          try {
          return HttpClient.get(BASE_AXIOS, { url: "sales-agent/auth/user" })
          } catch (error) {
            console.error('User Info API Error:', error);
            throw error;
          }
      },
      onSuccess: (res: IUserInfomationRes) => {
        dispatch(setUserState(res.data));
        dispatch(setIsAuthenticated(true))
      },
  });
}