import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import axios from "axios";
import CreateBudget from "./CreateBudget";
import "./App.css";

function Home() {
  const [budgets, setBudgets] = useState([]);

  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/budgets");
        setBudgets(response.data);
      } catch (error) {
        console.error("Error fetching budgets:", error);
      }
    };
    fetchBudgets();
  }, []);

  return (
    <div className="container-1">
      <div className="header-row">
        <div className="logo-title">
          <img src="budget.png" alt="Budget Logo" className="logo" />
          <h1>Budget Allocation System</h1>
        </div>
        <Link to="/create">
          <button className="create-btn">Create Budget</button>
        </Link>
      </div>

      <div className="budget-list">
        {budgets.map((budget) => (
          <div key={budget._id} className="budget-card">
            <div className="budget-header">
              <h3>{budget.title}</h3>
              <div className={`status ${budget.budgetStatus ? "approved" : "finished"}`}>
                {budget.budgetStatus ? "Approved" : "Pending"}
              </div>
            </div>
            <div className="budget-info">
              <table>
                <tbody>
                  <tr>
                    <td>MOOE</td>
                    <td>₱ {budget.MOOE.toLocaleString()}</td>
                  </tr><tr>
                    <td>Capital Outlay</td>
                    <td>₱ {budget.CO.toLocaleString()}</td>
                  </tr><tr>
                    <td>Personal Expenses</td>
                    <td>₱ {budget.PE.toLocaleString()}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateBudget />} />
      </Routes>
    </Router>
  );
}

export default App;