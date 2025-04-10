import { combineReducers } from "@reduxjs/toolkit";
import user from "../slices/user";
import customer from "../slices/customer";
import business from "../slices/business";


const rootReducer = combineReducers({
    user,
    customer,
    business
});

export default rootReducer;