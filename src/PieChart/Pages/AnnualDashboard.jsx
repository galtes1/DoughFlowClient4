// src/PieChart/Pages/AnnualDashboard.jsx
import React, { useState } from "react";
import {
  Container,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
  Box,
  Paper,
} from "@mui/material";
import { useUser } from "../../Users/Providers/UserProvider";
import { useTheme } from "../../Providers/CustomThemeProvider";
import useYearlySummary from "../Hooks/useYearlySummary";
import YearBarChart from "../Components/YearBarChart";
import theme from "../../Styles/theme";
import { motion } from "framer-motion";
import { fadeUp } from "../../Animations/motionVariants";

export default function AnnualDashboard() {
  const { user } = useUser();
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);

  const { incomeTotals, expenseTotals, loading, error } = useYearlySummary(
    user?.UserId,
    year
  );
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const totalIncome = incomeTotals.reduce((a, b) => a + b, 0);
  const totalExpense = expenseTotals.reduce((a, b) => a + b, 0);
  const net = totalIncome - totalExpense;

  const { isDark } = useTheme();

  if (loading)
    return (
      <Container sx={{ textAlign: "center"  }}>
        <CircularProgress />
        <Typography>Loading yearly summary…</Typography>
      </Container>
    );

  if (error)
    return (
      <Container sx={{ textAlign: "center" }}>
        <Typography color="error">{error}</Typography>
      </Container>
    );

  return (
    <motion.div variants={fadeUp} initial="hidden" animate="visible">
      <Container maxWidth="md" >
        {/* Header & year selector */}
        <Box
          sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3 }}
        >
          <Typography
            variant="h4"
            sx={{ color: isDark ? theme.colors.textDarkMode : theme.colors.text, fontFamily: "fantasy", mt:4 }}
          >
            Yearly Dashboard
          </Typography>
          <FormControl size="small">
            <InputLabel>Year...</InputLabel>
            <Select value={year} label="Year" onChange={(e) => setYear(e.target.value)}>
              {Array.from({ length: 5 }, (_, i) => currentYear - i).map((y) => (
                <MenuItem key={y} value={y}>
                  {y}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* KPI Cards */}
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 3 }}>
          <Paper elevation={3} sx={{ p: 2, flex: 1, minWidth: 150, textAlign: "center" }}>
            <Typography variant="h6">Total Income</Typography>
            <Typography variant="h5" fontWeight="bold">
              ₪{totalIncome.toLocaleString()}
            </Typography>
          </Paper>
          <Paper elevation={3} sx={{ p: 2, flex: 1, minWidth: 150, textAlign: "center" }}>
            <Typography variant="h6">Total Expense</Typography>
            <Typography variant="h5" fontWeight="bold">
              ₪{totalExpense.toLocaleString()}
            </Typography>
          </Paper>
          <Paper elevation={3} sx={{ p: 2, flex: 1, minWidth: 150, textAlign: "center" }}>
            <Typography variant="h6">Net Savings</Typography>
            <Typography variant="h5" fontWeight="bold">
              ₪{net.toLocaleString()}
            </Typography>
          </Paper>
        </Box>

        {/* Bar chart */}
        <YearBarChart
          months={months}
          incomeTotals={incomeTotals}
          expenseTotals={expenseTotals}
          year={year}

        />
      </Container>
    </motion.div>
  );
}
