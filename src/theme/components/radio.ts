import { radioAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
    createMultiStyleConfigHelpers(radioAnatomy.keys)

const primary = definePartsStyle({
    control: {
        borderWidth: '0.15rem',
        borderColor: '#0F454F',
        color:'transparent',
        height: '1.5rem',
        width: '1.5rem',
        _checked: {
         background : '#0F454F',
            borderColor: '#0F454F',
            transition: 'background 0.2s cubic-bezier(0.25, 0.1, 0.25, 1), color 0.2s cubic-bezier(0.25, 0.1, 0.25, 1), border-color 0.2s cubic-bezier(0.25, 0.1, 0.25, 1)'
        },
        _focus: {
            boxShadow: 'none',
        },
        _hover : {
            background : 'white'
        }
        // Let's also provide dark mode alternatives
        // _dark: {
        //     borderColor: 'gray.600',
        // },
    }

})

export const radioTheme = defineMultiStyleConfig({
    variants: { primary },
})
