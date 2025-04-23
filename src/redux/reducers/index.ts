import { combineReducers } from "@reduxjs/toolkit";
import user from "../slices/user";
import customer from "../slices/customer";
import upgrade from "../slices/upgrade";
import business from "../slices/business";


const rootReducer = combineReducers({
    user,
    customer,
    upgrade,
    business
});

export default rootReducer;