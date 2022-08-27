import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
    components: {
        Checkbox: {
            baseStyle: {
                icon: {
                    color: "white",
                },
                control: {
                    height: "24px", // works only when resetting defaultProps
                    width: "24px",
                    border: "1px",
                    borderColor: "gray.300",
                    _disabled: {
                        borderColor: "gray.300",
                        bg: "gray.200",
                    },
                },
                label: {},
            },
            defaultProps: {
                // Reset props
                size: null,
                variant: null,
            },
        },
    },
});

export { theme }