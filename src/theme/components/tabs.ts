import { tabsAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
    createMultiStyleConfigHelpers(tabsAnatomy.keys)

// define the base component styles
const baseStyle = definePartsStyle({

    tab: {

        color: '#C5B27D',
        _selected: {
            color: '#C5B27D',
            backgroundColor: 'white',
            borderBottom: '2px solid #C5B27D',
            boxShadow: 'none',
        },
        _focus: {
            boxShadow: 'none',
        },

    }
})

// export the component theme
export const tabsTheme = defineMultiStyleConfig({ baseStyle })