'use client';
import React, {ReactNode} from 'react';
import 'styles/App.css';
import 'styles/Contact.css';
import 'styles/MiniCalendar.css';
import {ChakraProvider} from '@chakra-ui/react';
import {CacheProvider} from '@chakra-ui/next-js';
import theme from '../theme/theme';
import StoreProvider from "../redux/provider";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

export default function AppWrappers({children}: { children: ReactNode }) {

    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: 2,
                refetchOnWindowFocus: false,
            },
        },
    });
    return (

        <StoreProvider>

            <QueryClientProvider client={queryClient}>
                {/*@ts-ignore*/}
            <CacheProvider>
                <ChakraProvider theme={theme}>{children}</ChakraProvider>{' '}
            </CacheProvider>

            </QueryClientProvider>
        </StoreProvider>
    );
}
