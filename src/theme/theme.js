import { extendTheme } from "@mui/joy";

const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          50: "#f1fcfb",
          100: "#cff8f4",
          200: "#9ef1e8",
          300: "#66e2da",
          400: "#36cbc5",
          500: "#1dafac",
          600: "#169898",
          700: "#156f70",
          800: "#15595a",
          900: "#062b2d",
        },
      },
    },
    dark: {
      palette: {
        primary: {
          50: "#f1fcfb",
          100: "#cff8f4",
          200: "#9ef1e8",
          300: "#66e2da",
          400: "#36cbc5",
          500: "#1dafac",
          600: "#169898",
          700: "#156f70",
          800: "#15595a",
          900: "#062b2d",
        },
      },
    },
  },
});

export default theme