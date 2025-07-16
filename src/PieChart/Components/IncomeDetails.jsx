import React from "react";
import {
  Container,
  Typography,
  Paper,
  Grid,
  List,
  CircularProgress,
  Box,
  Button,
} from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useUser } from "../../Users/Providers/UserProvider";
import { useTheme } from "../../Providers/CustomThemeProvider";
import useMonthlyRecords from "../Hooks/useMonthlyRecords";
import SingleRecord from "./SingleRecord";
import ConfirmationDialog from "./ConfirmationDialog";
import theme from "../../Styles/theme";
import useEnsureMonthId from "../Hooks/useEnsureMonthId";


const getCurrentMonthName = () =>
  new Date().toLocaleString("default", { month: "long" });

export default function IncomeDetails() {
  const { user } = useUser();
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const selectedMonthId = searchParams.get("monthId");
  useEnsureMonthId(selectedMonthId, user, "/Income-Details"); 
  const selectedMonth = searchParams.get("month");
  const selectedYear = searchParams.get("year");

  const {
    grouped,
    loading,
    error,
    handleDelete,
    handleEdit,
    deleteState,
    editState,
  } = useMonthlyRecords(
    user?.UserId,
    selectedMonthId,
    "income",
    selectedMonth,
    selectedYear
  );

  if (loading)
    return (
      <Container maxWidth="md" sx={{ mt: 0, p: { xs: 2, sm: 3 }, textAlign: "center" }}>
        <CircularProgress />
        <Typography>Loading incomes...</Typography>
      </Container>
    );

  if (error)
    return (
      <Container maxWidth="md" sx={{ mt: 4, textAlign: "center" }}>
        <Typography color="error">{error}</Typography>
      </Container>
    );

  return (
    <Container maxWidth="md" sx={{ mt: 0, p: { xs: 2, sm: 3 }, textAlign: "center" }}>
      <Box textAlign="center" mb={3}>
        <Typography variant="h4" gutterBottom sx={{ color: isDark ? theme.colors.textDarkMode : theme.colors.text, }}>
          Monthly Incomes
        </Typography>
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{ color: isDark ? theme.colors.textDarkMode : theme.colors.text, }}
        >
          {getCurrentMonthName()}
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {Object.entries(grouped).map(([category, items]) => (
          <Grid item xs={12} sm={6} md={4} key={category}>
            <Paper
              elevation={6}
              sx={{
                p: 3,
                borderRadius: 3,
                backgroundColor: isDark ? "#c0c4ca" : theme.colors.background,
                color: isDark ? "#080303" : "inherit",
              }}
            >
              <Typography variant="h6" gutterBottom textAlign="center" fontWeight="bold">
                {category}
              </Typography>
              <List>
                {items.map((income, idx) => (
                  <SingleRecord
                    key={income.incomeId}
                    id={income.incomeId}
                    amount={income.amount}
                    date={income.date}
                    description={income.description}
                    category={income.incomeName}
                    onEdit={() => handleEdit(income)}
                    onDelete={() => handleDelete(income)}
                    isDark={isDark}
                    showDivider={idx < items.length - 1}
                  />
                ))}
              </List>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Grid xs={12} sm={5} sx={{ mt: 3 }}>
        <Button variant="custom" onClick={() => navigate(-1)}>
          Back
        </Button>
      </Grid>

      <ConfirmationDialog
        open={deleteState.open}
        type="delete"
        title="Deletion confirmation"
        message="Are you sure you want to delete the record?"
        onClose={deleteState.onClose}
        onConfirm={deleteState.onConfirm}
      />

      <ConfirmationDialog
        open={editState.open}
        type="edit"
        title="Edit"
        onClose={editState.onClose}
        onConfirm={editState.onSave}
        editValues={{ amount: editState.amount, description: editState.desc }}
        onEditChange={(field, val) =>
          field === "amount" ? editState.setAmount(val) : editState.setDesc(val)
        }
      />
    </Container>
  );
}
