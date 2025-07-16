import React from "react";
import { Container, Typography, Box, Divider, Button } from "@mui/material";
import { useTheme } from "../Providers/CustomThemeProvider";
import { useUser } from "../Users/Providers/UserProvider";
import { useNavigate } from "react-router-dom";
import theme from "../Styles/theme";

export default function AboutPage() {
  const { isDark } = useTheme();
  const { user } = useUser();
  const navigate = useNavigate();

  const buttonLabel = user ? "Start now" : "Create an account";
  const buttonDestination = user ? "/create-expense" : "/signup";

  return (
    <Container
      maxWidth="md"
      sx={{
        mt: 0,
        py: 6,
        px: { xs: 2, sm: 4 },
        textAlign: "center",
      }}
    >
      <Typography
        variant="h3"
        sx={{
          fontFamily: "fantasy",
          fontWeight: "bold",
          color: isDark ? theme.colors.textDarkMode : theme.colors.text,
        }}
        gutterBottom
      >
        Welcome to DoughFlow
      </Typography>

      <Typography
        variant="h6"
        color="text.secondary"
        sx={{ mb: 5, maxWidth: 600, mx: "auto" }}
      >
        A lightweight tool to help you track your income and expenses without the clutter.
      </Typography>

      <Divider sx={{ mb: 5 }} />

      <Box sx={{ mb: 5 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          🌱 Minimal, by design
        </Typography>
        <Typography variant="body1" color="text.secondary">
          DoughFlow focuses on clarity. Just log what matters, and keep your financial view clean and simple.
        </Typography>
      </Box>

      <Box sx={{ mb: 5 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          📊 Monthly insights
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Visual summaries help you understand your spending patterns — without overwhelming you with data.
        </Typography>
      </Box>

      <Box>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          🔐 Private by default
        </Typography>
        <Typography variant="body1" color="text.secondary">
          We don’t track. We don’t share. Your data stays yours — safe, secure, and local.
        </Typography>
      </Box>

      {/* ✅ Dynamic button */}
      <Box sx={{ mt: 6 }}>
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          {user ? "Ready to go?" : "Ready to take control?"}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate(buttonDestination)}
          sx={{
            px: 4,
            py: 1.5,
            fontWeight: "bold",
            fontSize: "1rem",
            boxShadow: 3,
          }}
        >
          {buttonLabel}
        </Button>
      </Box>
    </Container>
  );
}
