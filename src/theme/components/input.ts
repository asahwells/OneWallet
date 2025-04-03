import { background } from "@chakra-ui/system";
import { mode, StyleFunctionProps } from "@chakra-ui/theme-tools";
import { fontWeight } from "html2canvas/dist/types/css/property-descriptors/font-weight";
export const inputStyles = {
  components: {
    Input: {
      baseStyle: {
        field: {
          fontWeight: 400,
          borderRadius: "8px",
        },
      },

      variants: {
        main: (props: StyleFunctionProps) => ({
          field: {
            bg: mode("transparent", "navy.800")(props),
            border: "1px solid",
            color: mode("secondaryGray.900", "white")(props),
            borderColor: mode("secondaryGray.100", "whiteAlpha.100")(props),
            borderRadius: "16px",
            fontSize: "sm",
            p: "20px",
            _placeholder: { color: "secondaryGray.400" },
          },
        }),
        auth: (props: StyleFunctionProps) => ({
          field: {
            fontWeight: "500",
            color: mode("navy.700", "white")(props),
            bg: mode("transparent", "transparent")(props),
            border: "1px solid",
            borderColor: mode(
              "secondaryGray.100",
              "rgba(135, 140, 189, 0.3)"
            )(props),
            borderRadius: "16px",
            _placeholder: { color: "secondaryGray.600", fontWeight: "400" },
          },
        }),
        authSecondary: () => ({
          field: {
            bg: "transparent",
            border: "1px solid",
            borderColor: "secondaryGray.100",
            borderRadius: "16px",
            _placeholder: { color: "secondaryGray.600" },
          },
        }),
        search: () => ({
          field: {
            border: "none",
            py: "11px",
            borderRadius: "inherit",
            _placeholder: { color: "secondaryGray.600" },
          },
        }),
      },
    },
    NumberInput: {
      baseStyle: {
        field: {
          fontWeight: 400,
        },
      },

      variants: {
        main: () => ({
          field: {
            bg: "transparent",
            border: "1px solid",

            borderColor: "secondaryGray.100",
            borderRadius: "16px",
            _placeholder: { color: "secondaryGray.600" },
          },
        }),
        auth: () => ({
          field: {
            bg: "transparent",
            border: "1px solid",

            borderColor: "secondaryGray.100",
            borderRadius: "16px",
            _placeholder: { color: "secondaryGray.600" },
          },
        }),
        authSecondary: () => ({
          field: {
            bg: "transparent",
            border: "1px solid",

            borderColor: "secondaryGray.100",
            borderRadius: "16px",
            _placeholder: { color: "secondaryGray.600" },
          },
        }),
        search: () => ({
          field: {
            border: "none",
            py: "11px",
            borderRadius: "inherit",
            _placeholder: { color: "secondaryGray.600" },
          },
        }),
      },
    },
    Select: {
      baseStyle: {
        field: {
          fontWeight: 400,
        },
      },

      variants: {
        main: (props: StyleFunctionProps) => ({
          field: {
            bg: mode("transparent", "navy.800")(props),
            border: "1px solid",
            color: "secondaryGray.600",
            borderColor: mode("secondaryGray.100", "whiteAlpha.100")(props),
            borderRadius: "16px",
            _placeholder: { color: "secondaryGray.600" },
          },
          icon: {
            color: "secondaryGray.600",
          },
        }),
        mini: (props: StyleFunctionProps) => ({
          field: {
            bg: mode("transparent", "navy.800")(props),
            border: "0px solid transparent",
            fontSize: "0px",
            p: "10px",
            _placeholder: { color: "secondaryGray.600" },
          },
          icon: {
            color: "secondaryGray.600",
          },
        }),
        subtle: () => ({
          box: {
            width: "unset",
          },
          field: {
            bg: "transparent",
            border: "0px solid",
            color: "secondaryGray.600",
            borderColor: "transparent",
            width: "max-content",
            _placeholder: { color: "secondaryGray.600" },
          },
          icon: {
            color: "secondaryGray.600",
          },
        }),
        transparent: (props: StyleFunctionProps) => ({
          field: {
            bg: "transparent",
            border: "0px solid",
            width: "min-content",
            color: mode("secondaryGray.600", "secondaryGray.600")(props),
            borderColor: "transparent",
            padding: "0px",
            paddingLeft: "8px",
            paddingRight: "20px",
            fontWeight: "700",
            fontSize: "14px",
            _placeholder: { color: "secondaryGray.600" },
          },
          icon: {
            transform: "none !important",
            position: "unset !important",
            width: "unset",
            color: "secondaryGray.600",
            right: "0px",
          },
        }),
        auth: () => ({
          field: {
            bg: "transparent",
            border: "1px solid",

            borderColor: "secondaryGray.100",
            borderRadius: "16px",
            _placeholder: { color: "secondaryGray.600" },
          },
        }),
        authSecondary: (props: StyleFunctionProps) => ({
          field: {
            bg: "transparent",
            border: "1px solid",

            borderColor: "secondaryGray.100",
            borderRadius: "16px",
            _placeholder: { color: "secondaryGray.600" },
          },
        }),
        search: (props: StyleFunctionProps) => ({
          field: {
            border: "none",
            py: "11px",
            borderRadius: "inherit",
            _placeholder: { color: "secondaryGray.600" },
          },
        }),
      },
    },
  
    Radio: { // Added Radio component to the theme
      variants: {
        radioButton: (props: StyleFunctionProps) => ({ // Define the new variant
          control: { // Styles for the radio button control (the circle)
            width: '18px',
            height: '18px',
            border: '1px solid',
            borderColor: mode('#E2E8F0', '#E2E8F0')(props), // Adjust as needed
            borderRadius: 'full',
            bg: mode('white', '#FEFEFE')(props),
            _checked: { // Styles when the radio button is checked
              bg: mode('#0F454F', '#0F454F')(props),
              borderColor: mode('#0F454F', '#0F454F')(props),
              _before: { // Style for the inner dot
                content: `""`,
                display: 'block',
                width: '10px',
                height: '10px',
                borderRadius: 'full',
                bg: 'white',
                margin: 'auto',
              },
            },
          },
          label: { // Styles for the label text
            fontWeight: 400,
            fontSize: '16px',
            lineHeight: '24px',
            letterSpacing: '-1.2%',
            color: mode('#0F454F', 'white')(props),
            paddingLeft: '8px', // Space between radio and label
          },
        }),
      },
    },
    Checkbox: { // Added checkbox component to the theme.
      variants: {
          attestation: (props:StyleFunctionProps) => ({
              control: {
                  backgroundColor: '#FEFEFE',
                  border: '1.8px solid #E2E8F0',
                  _checked: {
                      backgroundColor: '#0F454F',
                      border: '1.8px solid #E2E8F0',
                  },
              }
          })
      }
    }
  },
};
