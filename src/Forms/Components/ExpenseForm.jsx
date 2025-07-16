import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import expensesSchema from "../../PieChart/Models/expensesSchema";
import {Grid,Typography,Button,Container} from "@mui/material";
import LoopIcon from "@mui/icons-material/Loop";
import useForm from "../Hooks/useForm";
import { useUser } from "../../Users/Providers/UserProvider";
import { initialExpenseForm } from "../../PieChart/Helpers/initialForms/initialPieForm";
import { useTheme } from "../../Providers/CustomThemeProvider";
import FormButton from "./FormButton";
import CategoryInputRow from "./CategoryInputRow";
import useFinancialForm from "../Hooks/useFinancialForm";
import theme from "../../Styles/theme";





// רשימת הקטגוריות
const expenseCategories = [
  "Shopping", "Car", "Insurances", "Grocery", "Rent",
  "Apartment Bills", "Savings", "Child Care", "Tv Services",
  "Internet Services", "Phone Services", "Fun", "Other",
];

const ExpenseForm = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { handleCreateExpenses } = useForm(initialExpenseForm, expensesSchema);
  //const [selectedCategories, setSelectedCategories] = useState([]);
  //const [amounts, setAmounts] = useState({});
  //const [descriptions, setDescriptions] = useState({});
  //const [selectedMonthId, setSelectedMonthId] = useState(urlMonthId);
  const { isDark } = useTheme();
  const [searchParams] = useSearchParams();
  const urlMonthId = searchParams.get("monthId");

  const {
  selectedCategories,
  amounts,
  descriptions,
  selectedMonthId,
  handleCheckboxChange,
  handleAmountChange,
  handleDescriptionChange,
  handleReset
} = useFinancialForm(user, urlMonthId);
  


//שני טורים
  const leftColumn = expenseCategories.slice(0, 7);
  const rightColumn = expenseCategories.slice(7);


   const handleSubmit = async (event) => {
     event.preventDefault();

     if (selectedCategories.length === 0) {
       alert("אנא בחר לפחות קטגוריה אחת");
       return;
     }
    

    const expensesToSend = selectedCategories.map((category) => ({
      userId: parseInt(user.UserId, 10),
      amount: parseFloat(amounts[category]) || 0,
      expenseCategoryId: expenseCategories.indexOf(category) + 1,
      expenseName: category,
      date: new Date().toISOString(),
      monthId: parseInt(selectedMonthId, 10),
      description: descriptions[category] || "",
    }));
    try {
      await handleCreateExpenses(expensesToSend);
      navigate(-1);
    } catch (error) {
      console.error("❌ Error saving expenses:", error);
    }
  };
 
  return (
    <Container maxWidth="md" sx={{ mt: 0, p: { xs: 2, sm: 3 }, textAlign: "center" }}>
      <form onSubmit={handleSubmit}>
      <Typography variant="h4" gutterBottom sx={{ color: isDark ? theme.colors.textDarkMode : theme.colors.text, }}>
        Select the expenses that are relevant to you.
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {[leftColumn, rightColumn].map((column, colIndex) => (
          <Grid item xs={12} sm={6} key={colIndex}>
            {column.map((category) => (
              <CategoryInputRow
              key={category}
              category={category}
              isDark={isDark}
              isSelected={selectedCategories.includes(category)}
              amount={amounts[category]}
              description={descriptions[category]}
              onCheckboxChange={handleCheckboxChange}
              onAmountChange={handleAmountChange}
              onDescriptionChange={handleDescriptionChange}
              />
            ))}
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={2} my={2} justifyContent="center">
        <Grid item xs={12} sm={4}>
          <FormButton node="Cancel" color="error" variant="outlined" onClick={() => navigate("/")} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormButton node={<LoopIcon />} variant="outlined" onClick={handleReset} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            disabled={selectedCategories.length === 0}
            onClick={handleSubmit}
            type="submit"
          >
            Submit
          </Button>
        </Grid>
      </Grid>
      </form>
    </Container>
  );
};

export default ExpenseForm;
