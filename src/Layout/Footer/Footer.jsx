// src/Layout/Footer/Footer.jsx
import React from "react";
import {
  BottomNavigation,
  BottomNavigationAction,
  Paper,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../Routes/routesModel";
import theme from "../../Styles/theme";

export default function Footer() {
  const navigate = useNavigate();

  return (
    <Paper
      elevation={6}
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1200,
        backgroundColor: theme.colors.primary,   // בדיוק כמו ה-Header
        color: "white",
      }}
    >
      <BottomNavigation
        showLabels
        sx={{
          backgroundColor: "transparent",
          "& .Mui-selected": { color: "white" },
          "& .MuiBottomNavigationAction-root": {
            color: "white",
            "&:hover": { opacity: 0.85 },
          },
        }}
      >
        <BottomNavigationAction
          label="About"
          icon={<InfoIcon />}
          onClick={() => navigate(ROUTES.ABOUT)}
        />
        <BottomNavigationAction
          label="This Month"
          icon={<CalendarMonthIcon />}
          onClick={() => navigate(ROUTES.ROOT)}
        />
      </BottomNavigation>
    </Paper>
  );
}
