import { mode } from '@chakra-ui/theme-tools'
// import { defineStyleConfig, StyleFunctionProps } from '@chakra-ui/styled-system'
import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
    fonts: {
        heading: 'Plus Jakarta Sans',
        body: 'Plus Jakarta Sans',
    },
    colors:{
        primary: {
            400: "hsl(234, 80%, 60%)",
            500: "hsl(234, 80%, 50%)",
            600: "hsl(234, 80%, 40%)",
        }
    },
    components: {
        Button: {
            variants: {
                'table_action': (props) => ({
                    letterSpacing: "wider",
                    textDecoration: "none",
                    fontSize: "13px",
                    fontWeight: "800",
                    _hover: {
                        borderColor: props.colorMode === 'dark' ? 'white' : "black",
                        opacity: "0.7"
                    },
                    borderWidth: 1,
                    borderColor: props.colorMode === 'dark' ? "whiteAlpha.300" : "gray.300",
                    height: "auto",
                    pt: 1,
                    pb: 1,
                    px: 3
                }),
                'filter': (props) => ({
                    borderStyle: "dashed",
                    borderWidth: 1,
                    py: "4px",
                    px: "6px",
                    gap: "4px",
                    _hover: {
                        bg: "#88888822"
                    },
                    height: "auto",
                    borderRadius: "full",
                    fontSize: "14px",
                }),
                'tab':  (props) => ({
                    height: "auto",
                    py: 3,
                    px: 5,
                    mb: "-0.125rem",
                    roundedBottom: "none",
                    roundedTop: "lg",
                    _hover: {
                        bg: props.colorMode === "dark" ? "gray.800" : "gray.100"
                    },
                    _active: {
                        bg: "none",
                        color: props.colorMode === "dark" ? "white" : "primary.500", 
                        borderBottomWidth: "0.125rem", 
                        borderColor: props.colorMode === "dark" ? "white" : "primary.500", 
                    }
                }),
                'cbx-card':  (props) => ({
                    bg: props.colorMode === "dark" ? "black !important" : "white !important"
                }),
                
                
                
            }   
        }
    },
    styles: {
        global: (props) => ({
            body: {
                color: mode('gray.800', 'whiteAlpha.900')(props),
                bg: mode('white', 'black')(props),
                lineHeight: 'base',
            },
            'th': {
                textTransform: "none !important"
            },
            'td': {
                paddingY: "8px !important",
            },
            '.filter-card .cbx-wrapper': {
                minW: "auto !important"
            },
            '.ref-card:hover .cbx-wrapper': {
                borderColor: "primary.300",
                borderWidth: 1
            },
            '.cbx-navigate': {
                cursor: "pointer"
            },
            '.ce-block__content': {
                maxWidth: "800px !important",
            },
            ".ce-toolbar__content": {
                maxWidth: "800px !important",
            },
            ".codex-editor__redactor": {
                paddingBottom: "64px !important"
            },
            "h1": {
                fontSize: "var(--chakra-fontSizes-3xl)",
                fontWeight: "800"
            },
            "h2": {
                fontSize: "var(--chakra-fontSizes-2xl)",
                fontWeight: "800"
            },
            "h3": {
                fontSize: "var(--chakra-fontSizes-xl)",
                fontWeight: "800"
            },
            "h4": {
                fontSize: "var(--chakra-fontSizes-lg)",
                fontWeight: "800"
            },
            "h5": {
                fontSize: "var(--chakra-fontSizes-md)",
                fontWeight: "800"
            },
            "h6": {
                fontSize: "var(--chakra-fontSizes-sm)",
                fontWeight: "800"
            },
            ".editorjs-codeFlask_LangDisplay": {
                height: "auto !important"
            },
            ".codeflask--has-line-numbers::before": {
                display: "none !important",
            },
            ".codeflask--has-line-numbers": {
                paddingLeft: "20px !important"
            },
            ".codeflask--has-line-numbers .codeflask__flatten": {
                "left": "20px !important",
                width: "calc(100% - 20px)"
            },
            ".codeflask__lines": {
                display: "none !important"
            },
            ".cbx-snippet-wrapper": {
                padding: "0.5rem",
                rounded: "md"
            },
            ".cbx-snippet-wrapper:hover": {
                bg: "#88888811"
            }
        }),
    },
})