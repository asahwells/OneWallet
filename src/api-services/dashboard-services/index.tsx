import { useMutation } from "@tanstack/react-query";
import { IDashboardGraphRes, IDashboardInfoRes, IUserInfomationRes } from "./interfaces";
import { BASE_AXIOS, HttpClient } from "api-services/http";
import { useDispatch } from "react-redux";
import { setUserState, setIsAuthenticated } from '../../redux/slices/user';

export const useFetchDashboard = () => {
  
    return useMutation({
        mutationFn: (): Promise<IDashboardInfoRes> => {
           return HttpClient.get(BASE_AXIOS, { url: "sales-agent/dashboard" })
        },
        onSuccess: (res: IDashboardInfoRes) => {
          return res;
        },
    });
}

export const useFetchDashboardGraph = () => {
  
  return useMutation({
      mutationFn: (): Promise<IDashboardGraphRes> => {
         return HttpClient.get(BASE_AXIOS, { url: "sales-agent/dashboard/graph" })
      },
      onSuccess: (res: IDashboardGraphRes) => {
        return res;
      },
  });
}

export const useFetchLoggedInUser = () => {
  const dispatch = useDispatch();

  return useMutation({
      mutationFn: (): Promise<IUserInfomationRes> => {
          return HttpClient.get(BASE_AXIOS, { url: "sales-agent/auth/user" })
      },
      onSuccess: (res: IUserInfomationRes) => {
        dispatch(setUserState(res.data));
        dispatch(setIsAuthenticated(true))
      },
  });
}