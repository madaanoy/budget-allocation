import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import axios from "axios";
import CreateBudget from "./CreateBudget";
import BudgetDetails from "./BudgetDetails";
import RealignBudget from "./RealignBudget";
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
    <div className="home-cont">
      <div className="header-row">
        <div className="logo-title">
          <img src="/budget.png" alt="Budget Logo" className="logo" />
          <h1>Budget Allocation System</h1>
        </div>
        <Link to="/create">
          <button className="create-btn">Create</button>
        </Link>
      </div>

      <div className="budget-list">
        {budgets.map((budget) => (
          <div key={budget._id} className="budget-card">
            <div className="budget-header">
              <Link to={`/budget/${budget._id}`}>
                <h3 className="clickable-title">{budget.title}</h3>
              </Link>
              <div className={`status ${budget.budgetStatus ? "green" : "yellow"}`}>
                {budget.budgetStatus ? "Approved" : "Pending"}
              </div>
            </div>
            <div className="budget-info">
              <table>
                <tbody>
                  <tr>
                    <td rowSpan="3" className="left-merged-column">
                      {/* change into dynamic content later */}
                      MM/DD/YY
                    </td>
                    <td>MOOE</td>
                    <td className="money">₱ {budget.MOOE.toLocaleString()}</td>
                  </tr><tr>
                    <td>CO</td>
                    <td className="money">₱ {budget.CO.toLocaleString()}</td>
                  </tr><tr>
                    <td>PS</td>
                    <td className="money">₱ {budget.PE.toLocaleString()}</td>
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
        <Route path="/budget/:id" element={<BudgetDetails />} />
        <Route path="/realign/:id" element={<RealignBudget />} />
      </Routes>
    </Router>
  );
}

export default App;