import {
  extendTheme,
  type ThemeOverride,
  withDefaultColorScheme,
  theme as baseTheme,
} from "@chakra-ui/react";

const themeOverride: ThemeOverride = {
  // styles: {
  //   global: {
  //     body: {
  //       backgroundColor: "gray.700",
  //       color: "gray.100",
  //     },
  //   },
  // },
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
  colors: {
    primary: baseTheme.colors.cyan,
  },
  components: {
    Checkbox: {
      baseStyle: {
        icon: {
          // color: "gray.300",
          // backgroundColor: "gray.600",
        },
        control: {
          height: "24px", // works only when resetting defaultProps
          width: "24px",
          border: "2px",
          // borderColor: "gray.300",
          // backgroundColor: "gray.600",
          _disabled: {
            borderColor: "gray.300",
            bg: "gray.200",
          },
          _checked: {
            // backgroundColor: "gray.100",
            // borderColor: "gray.300",
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
};

const theme = extendTheme(themeOverride);

export { theme };
