import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IBusiness, IBusinessSliceInitialState } from "./interfaces";

const initialState: IBusinessSliceInitialState = {

    businessDetails: null,
    isLoading: false,
    error: null,
};

const businessSlice = createSlice({
    name: "business",
    initialState,
    reducers: {
        setBusiness: (state, action: PayloadAction<IBusiness | null>) => {
        state.businessDetails = action.payload;

      }
    },
});

export const { setBusiness } = businessSlice.actions;

export default businessSlice.reducer;