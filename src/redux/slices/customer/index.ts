import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {ICustomer, ICustomerSliceInitialState} from "./interface";

const initialState: ICustomerSliceInitialState = {

    customerDetails: null,
    isLoading: false,
    error: null,
};

const customerSlice = createSlice({
    name: "customer",
    initialState,
    reducers: {
        setCustomer: (state, action: PayloadAction<ICustomer | null>) => {
        state.customerDetails = action.payload;

      }
    },
});

export const { setCustomer } = customerSlice.actions;

export default customerSlice.reducer;