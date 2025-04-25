// theme.ts (tsx file with usage of StyleFunctions, see 4.)
import { extendTheme } from '@chakra-ui/react'
import type { StyleFunctionProps } from '@chakra-ui/styled-system'

export const textStyles = extendTheme({
    baseStyle: {
        fontSize: '0.75rem',
        lineHeight: '14px',
        fontWeight: '400',
        fontFamily: 'Inter',
        color: '#0F454F',
    },

    variants: {

        headerXl: (props: StyleFunctionProps) => ({
            fontSize: '28px',
            fontWeight: '600'
        }),
        headerLg: (props: StyleFunctionProps) => ({
            fontSize: '24px',
            fontWeight: '500'
        }),

        headerBold: (props: StyleFunctionProps) => ({
            fontSize: '18px',
            fontWeight: '700'
        }),

        header: (props: StyleFunctionProps) => ({
            fontSize: '18px',
            fontWeight: '500'
        }),

        md: (props: StyleFunctionProps) => ({
            fontSize: '16px',
            fontWeight: '500',
            color: '#344256'
        }),

        md3: (props: StyleFunctionProps) => ({
            fontSize: '20px',
            fontWeight: '500',
            color: '#222B38'
        }),

        sm: (props: StyleFunctionProps) => ({
            fontSize: '14px',
            fontWeight: '400',
            color: '#344256',
            lineHeight: '22px'
        }),

        md2: (props: StyleFunctionProps) => ({
            fontSize: '14px',
            fontWeight: '600',
            color: '#344256'
        }),

        base: (props: StyleFunctionProps) => ({
            fontSize: '16px',
            fontWeight: '400',
            color: '#344256'
        }),

        base2: (props: StyleFunctionProps) => ({
            fontSize: '16px',
            fontWeight: '400',
            color: '#222B38'
        }),

        sm2: (props: StyleFunctionProps) => ({
            fontSize: '14px',
            fontWeight: '400',
            color: '#222B38'
        }),

        logout: (props: StyleFunctionProps) => ({
            fontSize: '12.65px',
            fontWeight: '600',
            color: '#344256'
        }),

        logoutBase: (props: StyleFunctionProps) => ({
            fontSize: '10.54px',
            fontWeight: '400',
            color: '#344256'
        }),

        lg: (props: StyleFunctionProps) => ({
            fontSize: '16px',
            fontWeight: '600',
            color: '#344256'
        }),

        sml: (props: StyleFunctionProps) => ({
            fontSize: '14px',
            fontWeight: '500',
            color: '#344256'
        }),

        sma: (props: StyleFunctionProps) => ({
            fontSize: '16px',
            fontWeight: '600',
            color: '#222B38'
        }),

        norm: (props: StyleFunctionProps) => ({
            fontSize: '18px',
            fontWeight: '600',
            color: '#222B38'
        }),

        head: (props: StyleFunctionProps) => ({
            fontSize: '18px',
            fontWeight: '700',
            color: '#222B38'
        }),

        notify: (props: StyleFunctionProps) => ({
            fontSize: '18px',
            fontWeight: '500',
            color: '#344256'
        }),

        dormant: (props: StyleFunctionProps) => ({
            fontSize: '16px',
            fontWeight: '500',
            color: '#7C92B0'
        }),


        xsBold: (props: StyleFunctionProps) => ({
            fontSize: '10px',
            fontWeight: '700',
            color: '#344256'
        }),

        xs: (props: StyleFunctionProps) => ({
            fontSize: '10px',
            fontWeight: '500',
            color: '#344256'
        }),

        chartLabel: (props: StyleFunctionProps) => ({
            fontSize: '14px',
            fontWeight: '700',
            color: '#344256'
        }),

        label: (props: StyleFunctionProps) => ({
            fontSize: '14px',
            fontWeight: '500',
            color: '#546C8D'
        }),

        tabLabel: (props: StyleFunctionProps) => ({
            fontSize: '14px',
            fontWeight: '500',
            color: '#344256'
        }),

        tableLabel: (props: StyleFunctionProps) => ({
            fontSize: '9.63px',
            fontWeight: '700',
            color: '#C5B27D'
        }),

        tableHeader: (props: StyleFunctionProps) => ({
            fontSize: '14px',
            fontWeight: '600',
            color: '#344256'
        }),


        tableSubHeader: (props: StyleFunctionProps) => ({
            fontSize: '11.38px',
            fontWeight: '400',
            color: '#344256'
        }),


        sideBar: (props: StyleFunctionProps) => ({
            fontSize: '14px',
            fontWeight: '400',
            color: '#0F454F'
        }),

        radioText: (props: StyleFunctionProps) => ({
            fontSize: '12px',
            fontWeight: '700',
            color: '#344256'
        }),

        error: (props: StyleFunctionProps) => ({
            fontSize: '12px',
            fontWeight: '400',
            color: '#E53E3E'
        }),

        otvVerifyTitle: (props: StyleFunctionProps) => ({
            fontWeight: '700',
            fontSize: '18px',
            color: '#222B38',
        }),
        
        otvVerifySubTitle: (props: StyleFunctionProps) => ({
            fontWeight: '400',
            fontSize: '14px',
            color: '#344256',
            
        })

    }
})

