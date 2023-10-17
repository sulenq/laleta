import { extendTheme } from "@chakra-ui/react";

export const globalTheme = extendTheme({
  colors: {
    p: {
      50: "#f1f8ff",
      100: "#CBF8FD",
      200: "#97ECFC",
      300: "#63D6F8",
      400: "#3CBDF1",
      500: "#0097e8",
      600: "#0075C7",
      700: "#0057A7",
      800: "#003E86",
      900: "#002C6F",
    },
    ap: {
      50: "#0097e8",
      100: "#0097e8",
      200: "#0097e8",
      300: "#0097e8",
      400: "#0097e8",
      500: "#0097e8",
      600: "#0097e8",
      700: "#0097e8",
      800: "#0097e8",
      900: "#0097e8",
    },
    bnw: {
      200: "white",
      300: "white",
      500: "#050505",
      600: "#050505",
    },
    wnb: {
      200: "#050505",
      300: "#050505",
      500: "white",
      600: "white",
    },
    b: "#050505",
    bt: "#333333",
    w: "white",
    wt: "#eeeeee",
  },

  styles: {
    global: (props) => ({
      body: {
        bg: props.colorMode === "dark" ? "#050505" : "white",
        color: props.colorMode === "dark" ? "wt" : "bt",
      },
    }),
  },

  components: {
    Drawer: {
      baseStyle: (props) => ({
        dialog: {
          bg: "transparent",
          color: props.colorMode === "dark" ? "wt" : "wt",
          boxShadow: "none",
        },
      }),
    },

    Modal: {
      baseStyle: (props) => ({
        dialog: {
          bg: props.colorMode === "dark" ? "black" : "white",
          color: props.colorMode === "dark" ? "wt" : "bt",
          boxShadow: "none",
        },
      }),
    },

    Menu: {
      baseStyle: (props) => ({
        list: {
          bg: props.colorMode === "dark" ? "#050505cc" : "#ffffffcc",
          backdropFilter: "blur(10px)",
          border: "1px solid var(--divider)",
          p: 0,
          overflow: "hidden",
        },
        item: {
          bg: "transparent",
          _hover: { bg: "var(--divider)" },
        },
      }),
    },

    Button: {
      baseStyle: {
        fontWeight: 700,
        borderRadius: "4px",
      },
    },

    Input: {
      baseStyle: (props) => ({
        field: {
          _autofill: {
            boxShadow:
              props.colorMode === "dark"
                ? "0 0 0px 1000px #050505 inset"
                : "0 0 0px 1000px #ffffff inset",
            border: "2px solid var(--divider) !important",
          },
        },
      }),
    },

    Checkbox: {
      baseStyle: (props) => ({
        icon: {
          color: "wt",
        },
      }),
    },

    Tooltip: {
      baseStyle: {
        bg: "p.500",
        color: "w",
        "--popper-arrow-bg": "#0097e8",
      },
    },
  },
});
