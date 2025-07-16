import { useEffect, useState } from "react";
import { fetchMonthId } from "../../PieChart/Services/PieApiServices";

export default function useFinancialForm(user, urlMonthId) {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [amounts, setAmounts] = useState({});
  const [descriptions, setDescriptions] = useState({});
  const [selectedMonthId, setSelectedMonthId] = useState(urlMonthId);

  useEffect(() => {
    const fetchCurrentMonthId = async () => {
      if (!selectedMonthId && user) {
        const currentMonth = new Date().getMonth() + 1;
        const currentYear = new Date().getFullYear();
        const fetchedMonthId = await fetchMonthId(user.UserId, currentMonth, currentYear);
        setSelectedMonthId(fetchedMonthId);
      }
    };
    fetchCurrentMonthId();
  }, [selectedMonthId, user]);

  const handleCheckboxChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category]
    );

    setAmounts((prev) => ({
      ...prev,
      [category]: prev[category] || "",
    }));
  };

  const handleAmountChange = (category, value) => {
    setAmounts((prev) => ({
      ...prev,
      [category]: value,
    }));
  };

  const handleDescriptionChange = (category, value) => {
    setDescriptions((prev) => ({
      ...prev,
      [category]: value,
    }));
  };

  const handleReset = () => {
    setSelectedCategories([]);
    setAmounts({});
    setDescriptions({});
  };



  return {
    
    selectedCategories,
    amounts,
    descriptions,
    selectedMonthId,
    handleCheckboxChange,
    handleAmountChange,
    handleDescriptionChange,
    handleReset
  };
}
