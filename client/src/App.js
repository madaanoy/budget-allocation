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
    <center>
      <div className="container">
        <h1>Budget Allocation System</h1>
        <Link to="/create">
          <button className="create-btn">Create New Budget</button>
        </Link>
        
        <div className="budget-list">
          {budgets.map((budget) => (
            <div key={budget._id} className="budget-card">
              <div className="budget-info">
                <h3>{budget.title}</h3>
                <p>MOOE: ₱{budget.MOOE.toLocaleString()}</p>
                <p>Capital Outlay: ₱{budget.CO.toLocaleString()}</p>
                <p>Personal Expenses: ₱{budget.PE.toLocaleString()}</p>
              </div>
              <div className={`status ${budget.budgetStatus ? "approved" : "finished"}`}>
                {budget.budgetStatus ? "APPROVED" : "FINISHED"}
              </div>
            </div>
          ))}
        </div>
      </div>
    </center>
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