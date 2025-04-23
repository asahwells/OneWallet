import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {IUser, IUpgradeSliceInitialState, UpgradeSteps} from "./interface";

const initialState: IUpgradeSliceInitialState = {

    upgradeDetails: null,
    isLoading: false,
    error: null,
    currentStep: UpgradeSteps.BvnOrNin,
};

const upgradeSlice = createSlice({
    name: "upgrade",
    initialState,
    reducers: {
        setUpgrade: (state, action: PayloadAction<IUser | null>) => {
        state.upgradeDetails = action.payload;

        },

        setCurrentStep: (state, action: PayloadAction<UpgradeSteps>) => {
            state.currentStep = action.payload;
        },

        clearUpgradeDetails: (state) => {
            state.upgradeDetails = null;
            state.currentStep = UpgradeSteps.BvnOrNin;
            state.isLoading = false;
            state.error = null;
        }
    },
});

export const { setUpgrade, setCurrentStep, clearUpgradeDetails } = upgradeSlice.actions;

export default upgradeSlice.reducer;