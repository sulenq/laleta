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
      500: "#000000",
      600: "#000000",
    },
    wnb: {
      200: "#000000",
      300: "#000000",
      500: "white",
      600: "white",
    },
    b: "#000000",
    bt: "#333333",
    w: "white",
    wt: "#eeeeee",
  },

  styles: {
    global: (props) => ({
      body: {
        bg: props.colorMode === "dark" ? "#000000" : "white",
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
          bg: props.colorMode === "dark" ? "#000000cc" : "#ffffffcc",
          color: props.colorMode === "dark" ? "wt" : "bt",
          boxShadow: "none",
          borderRadius: "10px",
          mx: "16px",
          backdropFilter: "blur(20px)",
        },
        overlay: {
          bg: "#5b5b5b50",
          backdropFilter: "blur(5px)",
        },
        header: {
          px: "22px",
        },
        body: {
          px: "22px",
        },
        footer: {
          px: "16px",
        },
      }),
    },

    Toast: {
      baseStyle: {
        fontSize: [13, null, 15],
      },
    },

    Menu: {
      baseStyle: (props) => ({
        button: {
          _focus: { bg: "var(--divider) !important" },
          _focusVisible: { bg: "var(--divider) !important" },
          _active: { bg: "var(--divider) !important" },
        },
        list: {
          bg: props.colorMode === "dark" ? "#000000cc" : "#ffffffcc",
          backdropFilter: "blur(10px)",
          border: "1px solid var(--divider)",
          p: 0,
          overflow: "hidden",
        },
        item: {
          bg: "transparent",
          _hover: { bg: "var(--divider)" },
          py: 3,
          px: 4,
        },
      }),
    },

    Button: {
      baseStyle: {
        fontWeight: 600,
        borderRadius: "8px",
      },
    },

    Input: {
      baseStyle: (props) => ({
        field: {
          _autofill: {
            boxShadow:
              props.colorMode === "dark"
                ? "0 0 0px 1000px #000000 inset"
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
