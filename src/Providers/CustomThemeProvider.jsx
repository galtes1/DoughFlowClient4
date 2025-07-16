// src/Providers/CustomThemeProvider.jsx

import React, { createContext, useCallback, useContext, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import baseTheme from "../Styles/theme";

const ThemeContext = createContext();

export default function CustomThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false);

  const toggleDarkMode = useCallback(() => setIsDark((prev) => !prev), []);

  /*
   * Build MUI palette from the custom colors object
   */
  const muiPalette = {
    mode: isDark ? "dark" : "light",
    primary:   { main: baseTheme.colors.primary,  contrastText: "#ffffff" },
    secondary: { main: baseTheme.colors.secondary,  contrastText: "#ffffff" },
    success:   { main: baseTheme.colors.success,  contrastText: "#ffffff" },
    info: {main: baseTheme.colors.edit},
    error: {main: baseTheme.colors.delete},

    background: {
      default: isDark ? "#121212" : baseTheme.colors.background,
      paper:   isDark ? "#1e1e1e" : baseTheme.colors.background,
    },

    text: {
      primary: isDark ? baseTheme.colors.textDarkMode : baseTheme.colors.text,
      secondary: isDark ? "#BBBBBB" : "#333333",
    },
  };

  const muiTheme = createTheme({
    palette: muiPalette,

    typography: {
      fontFamily: "'Varela Round', 'Segoe UI', sans-serif",
    },

    components: {
      MuiTypography: {
        variants: [
          {
            props: { variant: "custom" },
            style: {
              color: muiPalette.text.primary,
              fontFamily: "fantasy",
              fontSize: "4.1rem",
            },
          },
          {
            props: { variant: "customBody" },
            style: {
              color: muiPalette.text.primary,
              fontSize: "1rem",
              fontWeight: 500,
              fontFamily: "'Segoe UI', sans-serif",
              lineHeight: 1.6,
              textAlign: "left",
              maxWidth: "600px",
              margin: "0 auto",
            },
          },
        ],
      },

      MuiPaper: {
        variants: [
          {
            props: { variant: "custom" },
            style: {
              backgroundColor: baseTheme.colors.secondary,
              color: baseTheme.colors.text,
              borderRadius: 12,
              boxShadow: isDark
                ? "0 4px 12px rgba(0, 0, 0, 0.3)"
                : "0 4px 12px rgba(0, 0, 0, 0.1)",
            },
          },
          {
            props: { variant: "gptBubble" },
            style: {
              backgroundColor: isDark ? "#2c2c2c" : "#ffffff",
              color: muiPalette.text.primary,
              padding: 16,
              borderRadius: 12,
              width: 400,
              minHeight: 80,
              textAlign: "right",
              direction: "rtl",
              fontFamily: "'Varela Round', sans-serif",
              fontSize: "1.1rem",
              lineHeight: 1.6,
              bottom: 70,
              position: "absolute",
              right: 100,
              zIndex: 10,
              boxShadow: isDark
                ? "0 4px 12px rgba(255, 255, 255, 0.1)"
                : "0 4px 12px rgba(0, 0, 0, 0.1)",
            },
          },
        ],
      },

      MuiButton: {
        variants: [
          {
            props: { variant: "custom" },
            style: {
              backgroundColor: isDark
                ? muiPalette.secondary.main
                : muiPalette.primary.main,
              color: isDark ? "#080303" : "#f9f9f9",
              fontWeight: "bold",
              fontSize: "1rem",
              padding: "8px 24px",
              borderRadius: 8,
              width: 150,
              boxShadow: isDark
                ? "0 4px 10px rgba(255, 255, 255, 0.1)"
                : "0 4px 10px rgba(0, 0, 0, 0.1)",
              "&:hover": {
                backgroundColor: isDark ? "#B7D0D4" : "#9BA0C0",
              },
            },
          },
        ],
      },

      MuiFormControlLabel: {
        styleOverrides: {
          label: {
            color: muiPalette.text.primary,
          },
        },
      },

      MuiListItemText: {
        defaultProps: {
          primaryTypographyProps: {
            color: "text.primary",
            fontWeight: "bold",
          },
          secondaryTypographyProps: {
            color: "text.secondary",
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={muiTheme}>
      <ThemeContext.Provider value={{ toggleDarkMode, isDark }}>
        {children}
      </ThemeContext.Provider>
    </ThemeProvider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a Provider");
  return context;
};
