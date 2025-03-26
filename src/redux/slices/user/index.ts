import { createSlice } from "@reduxjs/toolkit";
import {IUserSliceInitialState} from "./interface";

const initialState: IUserSliceInitialState = {
    userDetails: null,
    isAuthenticated: false,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserState: (state, action) => {
            state.userDetails = { ...state.userDetails, ...action.payload };
        },
        logoutUser: (state) => {
            state.userDetails = null;
        },
        setIsAuthenticated: (state, action) => {
            state.isAuthenticated = action.payload;
        }
    },
});

export const { setUserState, logoutUser, setIsAuthenticated } = userSlice.actions;

export default userSlice.reducer;