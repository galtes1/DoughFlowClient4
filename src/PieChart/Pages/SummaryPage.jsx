import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Container,
  CircularProgress,
  Paper
} from "@mui/material";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import ExpensesLegend from "../Components/ExpensesLegend";
import usePieChart from "../Hooks/usePieChart";
import { useUser } from "../../Users/Providers/UserProvider";
import { useTheme } from "../../Providers/CustomThemeProvider";
import theme from "../../Styles/theme";
import SideButton from "../../Component/SideButton";
import AddIcon from "@mui/icons-material/Add";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ActionDialog from "../../Component/ActionDialog";
import { fetchMonthId, downloadMonthCsv  } from "../Services/PieApiServices"; 
import { useSnack } from "../../Providers/SnackbarProvider";


const CHART_COLORS = [
  theme.colors.primary,
  theme.colors.secondary,
   "#FF6B6B", // אדום ורוד בוהק
  "#4ECDC4", // טורקיז
  "#FFD93D", // צהוב חרדל
  "#1A535C", // כחול־ירוק כהה
  "#FF9F1C", // כתום עז
  "#33de97", // טורקיז ירקרק
  "#E71D36", // אדום בוהק
  "#6A4C93", // סגול כהה
  "#FFBC42", // כתום־צהוב
  "#3D5A80", // כחול־אפור
  "#98C1D9", // תכלת בהיר
];




const SummaryPage = () => {
  const { user } = useUser();
  const setSnack = useSnack()
  const navigate = useNavigate();
  const { pieData, isLoading, error, getPieData, chartExpenses } = usePieChart();
  const noData = !pieData || !Object.keys(pieData).length;
  const { isDark } = useTheme();
  const [monthId, setMonthId] = useState(null);
  const [showBubble, setShowBubble] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [openView, setOpenView] = useState(false);

  const [searchParams] = useSearchParams();
  const selectedMonth = searchParams.get("month");
  const selectedYear = searchParams.get("year");
  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();

  const isReadOnlyView = 
    selectedMonth !== null && selectedYear !== null &&
    !(parseInt(selectedMonth) === currentMonth && parseInt(selectedYear) === currentYear);



  const getMonthName = (monthIndex, year) => {
    if (!monthIndex || !year) {
    const now = new Date();
    return now.toLocaleString("default", { month: "long", year: "numeric" });
    }
  return new Date(year, monthIndex - 1).toLocaleString("default", { month: "long", year: "numeric" });
  };

  const handleDownloadClick = async () => {
  try {
    await downloadMonthCsv(monthId, user.UserId);
    setSnack("success", "File Exporpted Successfully");
  } catch (err) {
    setSnack("error", "Failded to Download");
  }
};


  const addOptions = [
    {
      label: "Add Income",
      onClick: () => navigate(`/create-income?monthId=${monthId}`),
      color: "secondary",
      icon: <AddIcon />
    },
    {
      label: "Add Expense",
      onClick: () => navigate(`/create-expense?monthId=${monthId}`),
      color: "primary",
      icon: <AddIcon />
    }
  ];

  const viewOptions = [
  {
    label: "View Incomes",
    onClick: () => {
      if (isReadOnlyView) {
        navigate(`/Income-Details?month=${selectedMonth}&year=${selectedYear}`);
      } else {
        navigate("/Income-Details");
      }
    },
    color: "secondary",
    icon: <ListAltIcon />
  },
  {
    label: "View Expenses",
    onClick: () => {
      if (isReadOnlyView) {
        navigate(`/Expense-Details?month=${selectedMonth}&year=${selectedYear}`);
      } else {
        navigate("/Expense-Details");
      }
    },
    color: "primary",
    icon: <ListAltIcon />
  }
];


  const totalExpenses = pieData.expenses?.reduce((sum, item) => sum + (Number(item.amount) || 0), 0) || 0;
  const totalIncomes = pieData.incomes?.reduce((sum, item) => sum + (Number(item.amount) || 0), 0) || 0;

useEffect(() => {
  const fetchMonthData = async () => {
    if (!user) return;
    const month = selectedMonth || new Date().getMonth() + 1;
    const year = selectedYear || new Date().getFullYear();

    try {
      const id = await fetchMonthId(user.UserId, month, year);
      if (!id) return;
      setMonthId(id);
      getPieData(id, user.UserId);
    } catch (err) {
      console.error("❌ Failed to fetch monthId", err);
    }
  };

  fetchMonthData();
}, [user, selectedMonth, selectedYear]);


  useEffect(() => {
    const handleClickOutside = () => {
      if (showBubble) {
        setShowBubble(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [showBubble]);

  if (isLoading) {
    return (
      <Container maxWidth="md" sx={{ mt: 0, p: { xs: 2, sm: 3 }, textAlign: "center" }}>
        <CircularProgress />
        <Typography>Loading data...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ mt: 0, p: { xs: 2, sm: 3 }, textAlign: "center" }}>
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }

  if (noData) {
    return (
      <Container maxWidth="md" sx={{ mt: 0, p: { xs: 2, sm: 3 }, textAlign: "center" }}>
        <Typography sx={{ color: isDark ? "#F7F9F9" : "#080303" }} variant="h4" fontWeight="bold" gutterBottom>
          {getMonthName(selectedMonth, selectedYear)}
        </Typography>
        <Typography color="error">No data available for this month.</Typography>
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 3 }}>
          <Button variant="contained" color="primary" onClick={() => navigate("/create-expense")}>My Expenses</Button>
          <Button variant="contained" color="secondary" onClick={() => navigate("/create-income")}>My Incomes</Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 0, p: { xs: 2, sm: 3 }, textAlign: "center" }}>
      <Typography sx={{ color: isDark ? theme.colors.textDarkMode : theme.colors.text }} variant="h4" fontWeight="bold" gutterBottom>
        {getMonthName(selectedMonth, selectedYear)}
      </Typography>

      <Box sx={{ position: "relative", display: "flex", justifyContent: "center", mt: 4 }}>
        <Box
          sx={{
            position: "absolute",
            left: { xs: "70%", sm: "calc(50% - 350px)" },
            transform: "translateX(-100%)",
            display: "flex",
            flexDirection: "column",
            gap: 2,
            top: 130
          }}
        >
          {!isReadOnlyView && (
            <SideButton
              text="Add…"
              icon={<AddIcon />}
              onClick={() => setOpenAdd(true)}
              sx={{
                backgroundColor: theme.colors.primary,
                '&:hover': { backgroundColor: '#9BA0C0' },
                minWidth: 160, py: 1.2, fontSize: "1rem"
              }}
            />
          )}

          <SideButton
            text="View…"
            icon={<ListAltIcon />}
            onClick={() => setOpenView(true)}
            sx={{
              backgroundColor: theme.colors.secondary,
              '&:hover': { backgroundColor: '#B7D0D4' },
              minWidth: 160, py: 1.2, fontSize: "1rem"
            }}
          />
          <SideButton
            text="Export..."
            icon={<ListAltIcon />}
            onClick={handleDownloadClick}
            sx={{
              backgroundColor: "#AFCFAD",
              '&:hover': { backgroundColor: '#CDE0C5' },
              minWidth: 160,
              py: 1.2,
              fontSize: "1rem"
            }}
/>


        </Box>

        <Paper elevation={3} sx={{ p: 2, borderRadius: 3 }}>
          <Box sx={{ height: 320, display: "flex", flexDirection: { xs: "column", sm: "row" } }}>
            <Box width={{ xs: '100%', sm: '200px' }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={chartExpenses}
                    dataKey="amount"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    labelLine={false}
                    label={false}
                  >
                    {chartExpenses.map((entry, idx) => (
                      <Cell key={idx} fill={CHART_COLORS[idx % CHART_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: theme.colors.background,
                      border: `1px solid ${theme.colors.border}`
                    }}
                    formatter={(value, name) => [`₪${value.toLocaleString()}`, name]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </Box>

            <ExpensesLegend items={chartExpenses} colors={CHART_COLORS} />
          </Box>

          <Typography
            variant="h6"
            sx={{ mt: 2, fontFamily: theme.fonts.main, color: isDark ? theme.colors.textDarkMode : theme.colors.text }}
          >
            Total Expenses: ₪{totalExpenses.toLocaleString()}
          </Typography>
        </Paper>
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom sx={{ mt: 2, color: isDark ? theme.colors.textDarkMode : theme.colors.text }}>
          Total Incomes For This Month:
        </Typography>
        <Typography variant="h6" gutterBottom sx={{ color: isDark ? theme.colors.textDarkMode : theme.colors.text }}>
          ₪{totalIncomes.toLocaleString()}
        </Typography>
      </Box>

      <ActionDialog open={openAdd} onClose={() => setOpenAdd(false)} title="What would you like to add?" options={addOptions} />
      <ActionDialog open={openView} onClose={() => setOpenView(false)} title="What would you like to view?" options={viewOptions} />
    </Container>
  );
};

export default SummaryPage;
