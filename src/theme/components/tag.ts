import { tagAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
    createMultiStyleConfigHelpers(tagAnatomy.keys)

const baseStyle = definePartsStyle({
    // define the part you're going to style
    container: {
        bg: '#E8EDEE',
        color: '#344256',
        borderRadius: '8px',
        fontWeight: '500',
        fontSize: '14px',
        paddingX: '6px',
        paddingY: '1.5px',
    },
})

export const tagTheme = defineMultiStyleConfig({ baseStyle })