import { border } from "@chakra-ui/system";
import { mode, StyleFunctionProps } from "@chakra-ui/theme-tools";
export const buttonStyles = {
  components: {
    Button: {
      baseStyle: {
        borderRadius: "16px",
        boxShadow: "45px 76px 113px 7px rgba(112, 144, 176, 0.08)",
        transition: ".25s all ease",
        boxSizing: "border-box",
        _focus: {
          boxShadow: "none",
        },
        _active: {
          boxShadow: "none",
        },
        _disabled: {
          border: "1.2px solid #6F8F95",
          backgroundColor:"#CFDADC",
          color:'#6F8F95',
          _hover:{
            border: "1.2px solid #6F8F95",
            backgroundColor:"#CFDADC",
            color:'#6F8F95'
          }
        }
      },
      variants: {
        outline: () => ({
          borderRadius: "4px",
          color:'#0F454F',
          fontWeight: '500',
          border: "1px",
          borderColor: '#0F454F'
        }),
        brand: (props: StyleFunctionProps) => ({
          bg: mode("#0F454F", "#0F454F")(props),
          color: "#FCFCFC",
          _focus: {
            bg: mode("#0F454F", "#0F454F")(props),
            color: "#FCFCFC",
          },
          _active: {
            bg: mode("#0F454F", "#0F454F")(props),
            color: "#FCFCFC",
          },
          _hover: {
            bg: mode("#0F454F", "#0F454F")(props),
            color: "#FCFCFC",
          },
          fontWeight: '400',
          fontSize: '16px',
          letterSpacing:'-2%',
          borderRadius:'8px'
        }),

        ghost: (props: StyleFunctionProps) => ({
          bg: mode("#CFDADC", "#CFDADC")(props),
          color: "#171C23",
          // _focus: {
          //   bg: mode("#0F454F", "#0F454F")(props),
          //   color: "#FCFCFC"
          // },
          // _active: {
          //   bg: mode("#0F454F", "#0F454F")(props),
          //   color: "#FCFCFC"
          // },
          _hover: {
            bg: mode("#0F454F", "#0F454F")(props),
            color: "#FCFCFC"
          },
        }),
        camera: (props: StyleFunctionProps) => ({
          outline: "2px dashed #64748B",
          borderRadius: "md",
          padding: "4",
        }),
        darkBrand: (props: StyleFunctionProps) => ({
          bg: mode("brand.900", "brand.400")(props),
          color: "white",
          _focus: {
            bg: mode("brand.900", "brand.400")(props),
          },
          _active: {
            bg: mode("brand.900", "brand.400")(props),
          },
          _hover: {
            bg: mode("brand.800", "brand.400")(props),
          },
        }),
        lightBrand: (props: StyleFunctionProps) => ({
          bg: mode("#F2EFFF", "whiteAlpha.100")(props),
          color: mode("brand.500", "white")(props),
          _focus: {
            bg: mode("#F2EFFF", "whiteAlpha.100")(props),
          },
          _active: {
            bg: mode("secondaryGray.300", "whiteAlpha.100")(props),
          },
          _hover: {
            bg: mode("secondaryGray.400", "whiteAlpha.200")(props),
          },
        }),
        light: (props: StyleFunctionProps) => ({
          bg: mode("secondaryGray.300", "whiteAlpha.100")(props),
          color: mode("secondaryGray.900", "white")(props),
          _focus: {
            bg: mode("secondaryGray.300", "whiteAlpha.100")(props),
          },
          _active: {
            bg: mode("secondaryGray.300", "whiteAlpha.100")(props),
          },
          _hover: {
            bg: mode("secondaryGray.400", "whiteAlpha.200")(props),
          },
        }),
        action: (props: StyleFunctionProps) => ({
          fontWeight: "500",
          borderRadius: "50px",
          bg: mode("secondaryGray.300", "brand.400")(props),
          color: mode("brand.500", "white")(props),
          _focus: {
            bg: mode("secondaryGray.300", "brand.400")(props),
          },
          _active: { bg: mode("secondaryGray.300", "brand.400")(props) },
          _hover: {
            bg: mode("secondaryGray.200", "brand.400")(props),
          },
        }),
        
        setup: (props: StyleFunctionProps) => ({
          fontWeight: "500",
          borderRadius: "50px",
          bg: mode("transparent", "brand.400")(props),
          border: mode("1px solid", "0px solid")(props),
          borderColor: mode("secondaryGray.400", "transparent")(props),
          color: mode("secondaryGray.900", "white")(props),
          _focus: {
            bg: mode("transparent", "brand.400")(props),
          },
          _active: { bg: mode("transparent", "brand.400")(props) },
          _hover: {
            bg: mode("secondaryGray.100", "brand.400")(props),
          },
        }),
      },
    },
  },
};
