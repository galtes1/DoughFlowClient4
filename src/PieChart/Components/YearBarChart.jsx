// src/PieChart/Components/YearBarChart.jsx

import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";
import { useTheme } from "../../Providers/CustomThemeProvider";
import theme from "../../Styles/theme";
import { useNavigate } from "react-router-dom";

{/*import React from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts";
import { useTheme } from "../../Providers/CustomThemeProvider";
import theme from "../../Styles/theme";
import { useNavigate } from "react-router-dom";


 * @param {number[]} months             array [1..12]
 * @param {number[]} incomeTotals       totals per month
 * @param {number[]} expenseTotals      totals per month

export default function YearBarChart({ months, incomeTotals, expenseTotals }) {
  const { isDark } = useTheme();
  

  // merge into one data array for recharts
  const data = months.map((m, idx) => ({
    name: m,
    Income: incomeTotals[idx] || 0,
    Expense: expenseTotals[idx] || 0,
  }));

  const monthNames = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];


  const primary = isDark ? theme.colors.primary : theme.colors.primary; // main
  const secondary = isDark ? theme.colors.secondary : theme.colors.secondary;
  const navigate = useNavigate();
  const handleBarClick = (data) => {
    console.log(data);
    
  const month = data.name; // או data.month בהתאם למבנה הנתונים
  console.log(month);
  
  navigate(`/summary?month=${month}`);
};

  return (
    <ResponsiveContainer width="100%" height={450}>
      <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
        <XAxis dataKey="name" tick={{ fontSize: 12 }} />
        <YAxis tick={{ fontSize: 12 }} />
        <Tooltip formatter={(v) => `₪${Number(v).toLocaleString()}`}   labelFormatter={(value) => monthNames[value-1]}  />
        <Legend />
        <Bar dataKey="Income" fill={secondary} radius={[4, 4, 0, 0]} onClick={handleBarClick}/>
        <Bar dataKey="Expense" fill={primary} radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
*/}

// src/PieChart/Components/YearBarChart.jsx



/**
 * @param {number[]} months
 * @param {number[]} incomeTotals
 * @param {number[]} expenseTotals
 * @param {number} year
 */
export default function YearBarChart({ months, incomeTotals, expenseTotals, year }) {
  const { isDark } = useTheme();
  const navigate = useNavigate();

  const data = months.map((m, idx) => ({
    name: m,
    Income: incomeTotals[idx] || 0,
    Expense: expenseTotals[idx] || 0,
  }));

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const primary = theme.colors.primary;
  const secondary = theme.colors.secondary;

  const handleBarClick = (data) => {
    const month = data.name;
    navigate(`/summary?month=${month}&year=${year}`);
  };

  return (
    <ResponsiveContainer width="100%" height={450}>
      <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
        <XAxis dataKey="name" tick={{ fontSize: 12 }} />
        <YAxis tick={{ fontSize: 12 }} />
        <Tooltip
          formatter={(v) => `₪${Number(v).toLocaleString()}`}
          labelFormatter={(value) => monthNames[value - 1]}
        />
        <Legend />
        <Bar dataKey="Income" fill={secondary} radius={[4, 4, 0, 0]} onClick={handleBarClick} />
        <Bar dataKey="Expense" fill={primary} radius={[4, 4, 0, 0]} onClick={handleBarClick} />
      </BarChart>
    </ResponsiveContainer>
  );
}

