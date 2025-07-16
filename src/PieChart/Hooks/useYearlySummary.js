import { useEffect, useState, useCallback } from "react";
import axios from "axios";           // משתמשים ב-AxiosProvider שכבר קיים
const apiUrl = "https://localhost:1463";


export default function useYearlySummary(userId, year) {
  const [months, setMonths] = useState([...Array(12).keys()].map(m => m + 1)); // 1-12
  const [incomeTotals, setIncomeTotals] = useState(Array(12).fill(0));
  const [expenseTotals, setExpenseTotals] = useState(Array(12).fill(0));
  const [loading, setLoading]   = useState(true);
  const [error,   setError]     = useState(null);

  const loadData = useCallback(async () => {
    if (!userId) return;
    setLoading(true);
    try {
      const { data } = await axios.get(apiUrl+"/api/months/year-summary", {
        params: { userId, year },
      });
      // data = [{month, incomeTotal, expenseTotal}, ...]
      const inc = Array(12).fill(0);
      const exp = Array(12).fill(0);
      data.forEach(rec => {
        const idx = rec.month - 1;
        inc[idx] = rec.incomeTotal;
        exp[idx] = rec.expenseTotal;
      });
      setIncomeTotals(inc);
      setExpenseTotals(exp);
      setError(null);
    } catch (err) {
      setError(err.message || "Failed to load yearly summary");
    } finally {
      setLoading(false);
    }
  }, [userId, year]);

  useEffect(() => { loadData(); }, [loadData]);

  return { months, incomeTotals, expenseTotals, loading, error };
}
