import React, { useEffect, useState } from "react";
import { useNavigate,useSearchParams } from "react-router-dom";
import { Grid,Typography, Button, Container} from "@mui/material";
import FormButton from "./FormButton";
import LoopIcon from "@mui/icons-material/Loop";
import { useUser } from "../../Users/Providers/UserProvider";
import useForm from "../Hooks/useForm";
import { useTheme } from "../../Providers/CustomThemeProvider";
import { fetchMonthId } from "../../PieChart/Services/PieApiServices";
import CategoryInputRow from "./CategoryInputRow";
import useFinancialForm from "../Hooks/useFinancialForm";
import theme from "../../Styles/theme";
// רשימת הקטגוריות
const IncomeCategories = [
  "First Salary", "Second Salary", "Allowance",
  "Rental Fees", "Other"
];

const IncomeForm = () => {
  const navigate = useNavigate();
  const {user} = useUser();
  const {handleCreateIncome} = useForm();
  //const [selectedCategories, setSelectedCategories] = useState([]);
  //const [selectedMonthId, setSelectedMonthId] = useState(urlMonthId);
  //const [amounts, setAmounts] = useState({});
  //const [descriptions, setDescriptions] = useState({});
  const {isDark} = useTheme();
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




  // שני טורים
  const leftColumn = IncomeCategories.slice(0, 3);
  const rightColumn = IncomeCategories.slice(3);



  const handleSubmit = async (event) => {
    event.preventDefault();

    if (selectedCategories.length === 0) {
      alert("אנא בחר לפחות קטגוריה אחת");
      return;
    }


     const incomeToSend = selectedCategories.map((category) => ({
          userId: parseInt(user.UserId, 10),
          amount: parseFloat(amounts[category]) || 0,
          incomeCategoryId: IncomeCategories.indexOf(category) + 1,
          incomeName: category,
          date: new Date().toISOString(),
          description: descriptions[category] || "",
          monthId: parseInt(selectedMonthId, 10),
        }));
        
        try {
          await handleCreateIncome(incomeToSend);
          navigate(-1);

        } catch (error) {
          console.error("❌ Error saving incomes:", error);
        }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 0, p: { xs: 2, sm: 3 }, textAlign: "center" }}>
       <form onSubmit={handleSubmit}>
       <Typography variant="h4" gutterBottom sx={{color: isDark ? theme.colors.textDarkMode : theme.colors.text,}}>
        Select the incomes that are relevant to you.
      </Typography>

      {/* סידור טורים */}
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

      {/* כפתורים */}
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
            Continue to the next step
          </Button>
        </Grid>
      </Grid>
      </form>
    </Container>
  );
};

export default IncomeForm;