"use client";

import React from "react";
import {Provider} from "react-redux";
import {baseStore} from "../store";

const StoreProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Provider store={baseStore}>{children}</Provider>
        </>
    );
};

export default StoreProvider;
