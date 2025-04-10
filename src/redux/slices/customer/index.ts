import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {ICustomer, ICustomerSliceInitialState} from "./interface";
import {RegisterSteps} from "../../../components/molecules/buttons/interfaces";

const initialState: ICustomerSliceInitialState = {

    customerDetails: null,
    isLoading: false,
    error: null,
    currentStep: RegisterSteps.EnterPhone,
};

const customerSlice = createSlice({
    name: "customer",
    initialState,
    reducers: {
        setCustomer: (state, action: PayloadAction<ICustomer | null>) => {
        state.customerDetails = action.payload;

      },

        setCurrentStep: (state, action: PayloadAction<RegisterSteps>) => {
            state.currentStep = action.payload;
        }
    },
});

export const { setCustomer, setCurrentStep } = customerSlice.actions;

export default customerSlice.reducer;