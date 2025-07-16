// src/PieChart/Hooks/useMonthlyRecords.js
import { useEffect, useState } from "react";
import {
  getExpenseData,
  getIncomeData,
  fetchMonthId,
  deleteExpenseData,
  deleteIncomeData,
  updateExpenseData,
  updateIncomeData,
} from "../Services/PieApiServices";

export default function useMonthlyRecords(userId, monthId, type, month, year) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [records, setRecords] = useState([]);
  const [grouped, setGrouped] = useState({});

  const [deleteState, setDeleteState] = useState({
    open: false,
    target: null,
    onConfirm: null,
    onClose: () => setDeleteState({ ...deleteState, open: false }),
  });

  const [editState, setEditState] = useState({
    open: false,
    target: null,
    amount: 0,
    desc: "",
    setAmount: (val) => setEditState((prev) => ({ ...prev, amount: val })),
    setDesc: (val) => setEditState((prev) => ({ ...prev, desc: val })),
    onClose: () => setEditState((prev) => ({ ...prev, open: false })),
   
    });

    const onSave = async () => {
  try {
       const updated = {
      ...editState.target,
      amount: parseFloat(editState.amount),
      description: editState.desc,
    };


    const id = type === "expense"
      ? editState.target?.expenseId
      : editState.target?.incomeId;

    if (!id) {
      console.error("❌ No valid ID found for update:", editState.target);
      return;
    }

    if (type === "expense") {
      await updateExpenseData(id, updated);
    } else {
      await updateIncomeData(id, updated);
    }

    loadData();
  } catch (err) {
    console.error("❌ Error saving:", err);
  } finally {
    editState.onClose();
  }
};



  const groupByName = (list, keyName) => {
    const groupedMap = {};
    list.forEach((item) => {
      const key = item[keyName];
      if (!groupedMap[key]) groupedMap[key] = [];
      groupedMap[key].push(item);
    });
    return groupedMap;
  };

  const loadData = async () => {
    if (!userId) return;
    setLoading(true);
    setError(null);

    try {
      let finalMonthId = monthId;

      if (!monthId && month && year) {
        finalMonthId = await fetchMonthId(userId, month, year);
        if (!finalMonthId) throw new Error("Month not found");
      }

      let data;
      if (type === "expense") {
        data = await getExpenseData(userId, finalMonthId);
      } else {
        data = await getIncomeData(userId, finalMonthId);
      }

      setRecords(data);
      const nameKey = type === "expense" ? "expenseName" : "incomeName";
      setGrouped(groupByName(data, nameKey));
    } catch (err) {
      console.error("❌ loadData error:", err);
      setError("Failed to load records");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [userId, monthId, month, year]);

  const handleDelete = (record) => {
    setDeleteState({
      open: true,
      target: record,
      onConfirm: async () => {
        try {
          if (type === "expense") {
            await deleteExpenseData(record.expenseId);
          } else {
            await deleteIncomeData(record.incomeId);
          }
          loadData();
        } catch (err) {
          console.error("❌ Delete error:", err);
        } finally {
          setDeleteState({ ...deleteState, open: false });
        }
      },
      onClose: () => setDeleteState({ ...deleteState, open: false }),
    });
  };

  const handleEdit = (record) => {

    setEditState({
      ...editState,
      open: true,
      target: record,
      amount: record.amount,
      desc: record.description,
    });
  };

  return {
    records,
    grouped,
    loading,
    error,
    deleteState,
    editState: {...editState, onSave},
    handleDelete,
    handleEdit,
  };
}
