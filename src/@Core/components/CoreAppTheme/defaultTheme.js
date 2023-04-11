/*
 * Created Date: 06-10-2022, 9:57:20 pm
 * Author: Peter
 * Email: phantrung696@gmail.com
 * -----
 * Last Modified:
 * Modified By:
 * -----
 * Copyright (c) 2022 PROS+ Group , Inc
 * -----
 * HISTORY:
 * Date      	By	Comments
 * ----------	---	----------------------------------------------------------
 */
import { createTheme } from "@mui/material/styles";
import { lightBlue, red } from "@mui/material/colors";

// Create a theme instance.
const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#0A8FDC",
    },
    secondary: {
      main: "#458C50",
    },
    third: {
      main: "#E7E7D6",
    },
    accent: {
      main: "#FF4E02",
    },
    mission: {
      main: "#FF7438",
    },
    error: {
      main: "#E50000",
    },
  },
  status: {
    danger: "orange",
  },
  typography: {
    fontFamily: ["Roboto", "sans-serif"].join(","),
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    htmlFontSize: 10,
    fontSize: 13,
    h1: {
      fontSize: "2.2rem",
      fontWeight: 700,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 700,
    },
    h3: {
      fontSize: "1.8rem",
      fontWeight: 700,
    },
    h4: {
      fontSize: "1.6rem",
      fontWeight: 700,
    },
    subtitle1: {
      fontSize: "1.5rem",
      fontWeight: 700,
    },
    subtitle2: {
      fontSize: "1.4rem",
      fontWeight: 700,
    },
    body1: {
      fontSize: "1.3rem",
    },
    body2: {
      fontSize: "1.4rem",
      fontWeight: 700,
    },
    caption: {
      fontSize: "1.2rem",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          // boxShadow: '0px 5px 6px rgba(0, 0, 0, 0.04)',
          textTransform: "capitalize",
          // fontSize: 14
        },
      },
    },
    // MuiTypography: {
    // 	styleOverrides: {
    // 		root: {
    // 			margin: 'unset'
    // 		}
    // 	}
    // }
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
              borderColor: "#3E68A8",
            },
          },
        },
      },
    },
  },
});

export default defaultTheme;
