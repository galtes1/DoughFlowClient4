import { Box } from '@mui/material';
import React from 'react'
import { useTheme } from '../../Providers/CustomThemeProvider';
import theme from "../../Styles/theme";


export default function Main({ children }) {
  const {isDark} = useTheme();
  return (
    <Box
      sx={{
        minHeight: "99vh",
        backgroundColor: isDark? "#333333" : theme.colors.background,
      }}
    >
      {children}
    </Box>
  );
}