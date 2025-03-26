import React from "react";

export interface IFundUserTemplate{
    userId?: any;
    children?: React.ReactNode;
}
export interface IIDProps {
    id: string;
}

export interface INotificationProps {
    onNotificationClick: ()=> void;
}

export interface FormValues {
    attachment: File | null; 
  }