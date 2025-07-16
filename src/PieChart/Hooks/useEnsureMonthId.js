// src/PieChart/Hooks/useEnsureMonthId.js
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchMonthId } from "../Services/PieApiServices";

/**
 * Ensures there is a valid monthId in the URL.
 * @param {string|null} monthIdFromQuery - current monthId from query string
 * @param {object} user - user object (must contain UserId)
 * @param {string} routePath - target route (e.g. "/Expense-Details")
 */
export default function useEnsureMonthId(monthIdFromQuery, user, routePath) {
  const navigate = useNavigate();

  useEffect(() => {
    const ensureMonthId = async () => {
      if (monthIdFromQuery || !user) return;

      const currentMonth = new Date().getMonth() + 1;
      const currentYear = new Date().getFullYear();

      try {
        const id = await fetchMonthId(user.UserId, currentMonth, currentYear);
        if (id) {
          navigate(`${routePath}?monthId=${id}`, { replace: true });
        }
      } catch (err) {
        console.error("❌ useEnsureMonthId error:", err);
      }
    };

    ensureMonthId();
  }, [monthIdFromQuery, user, routePath, navigate]);
}
