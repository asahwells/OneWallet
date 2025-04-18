import { useMutation } from "@tanstack/react-query";
import { BASE_AXIOS, HttpClient } from "api-services/http";
import { ICustomerInfoRes, ICustomersInfoRes } from "./interface";

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