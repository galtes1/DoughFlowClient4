// src/PieChart/Components/ExpensesLegend.jsx
import React from "react";
import { Box, Typography } from "@mui/material";
import theme from "../../Styles/theme";
import { useTheme } from "../../Providers/CustomThemeProvider";
  


const ExpensesLegend = ({ items, colors }) => {
    const { isDark } = useTheme();
  return (
    <Box sx={{ ml: 2 }}>
      {items.map((item, idx) => (
        <Box
          key={item.name}
          sx={{ display: "flex", alignItems: "center", mb: 1 }}
        >
          <Box
            sx={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              backgroundColor: colors[idx % colors.length],
              mr: 1,
            }}
          />
          <Typography
            variant="body2"
            sx={{ fontFamily: theme.fonts.main, color: isDark ? theme.colors.textDarkMode : theme.colors.text }}
          >
            {item.name} 
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default ExpensesLegend;
