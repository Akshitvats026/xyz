import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "https://xyz-rsyl.onrender.com/api";

function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "",
  });

  const token = localStorage.getItem("token");

  const fetchExpenses = async () => {
    try {
      const res = await axios.get(`${API}/expenses`, {
        headers: { Authorization: token },
      });
      setExpenses(res.data);
    } catch (err) {
      console.log("Error fetching expenses");
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addExpense = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/expense`, form, {
        headers: { Authorization: token },
      });
      fetchExpenses();
    } catch (err) {
      console.log("Error adding expense");
    }
  };

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div>
      <h2>Dashboard</h2>

      <h3>Total Expense: ₹{total}</h3>

      <form onSubmit={addExpense}>
        <input
          name="title"
          placeholder="Title"
          onChange={handleChange}
          required
        />
        <br />
        <input
          name="amount"
          type="number"
          placeholder="Amount"
          onChange={handleChange}
          required
        />
        <br />
        <input
          name="category"
          placeholder="Category"
          onChange={handleChange}
          required
        />
        <br />
        <button type="submit">Add Expense</button>
      </form>

      <ul>
        {expenses.map((exp) => (
          <li key={exp._id}>
            {exp.title} - ₹{exp.amount} ({exp.category})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;