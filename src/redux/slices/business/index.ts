import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {BusinessSteps, IBusiness, IBusinessSliceInitialState} from "./interfaces";
import {RegisterSteps} from "../../../components/molecules/buttons/interfaces";

const initialState: IBusinessSliceInitialState = {
    businessDetails: null,
    isLoading: false,
    error: null,
    currentStep: BusinessSteps.UserNationality,
};

const businessSlice = createSlice({
    name: "business",
    initialState,
    reducers: {
        setBusiness: (state, action: PayloadAction<IBusiness | null>) => {
        state.businessDetails = action.payload;

        },

        setCurrentBusinessStep: (state, action: PayloadAction<BusinessSteps>) => {
            state.currentStep = action.payload;
        },

        clearBusinessDetails: (state) => {
            state.businessDetails = null;
            state.currentStep = BusinessSteps.UserNationality;
            state.isLoading = false;
            state.error = null;
        }

    }
});

export const {setBusiness, setCurrentBusinessStep, clearBusinessDetails} = businessSlice.actions;

export default businessSlice.reducer;