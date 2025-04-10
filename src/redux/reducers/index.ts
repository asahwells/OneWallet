import { combineReducers } from "@reduxjs/toolkit";
import user from "../slices/user";
import customer from "../slices/customer";


const rootReducer = combineReducers({
    user,
    customer

});

export default rootReducer;