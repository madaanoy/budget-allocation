import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate,
} from "react-router-dom";
import axios from "axios";
import CreateBudget from "./CreateBudget";
import BudgetDetails from "./BudgetDetails";
import RealignBudget from "./RealignBudget";
import LogIn from "./LogIn";
import SignUp from "./SignUp";
import "./App.css";

function Home() {
  const [budgets, setBudgets] = useState([]);
  const navigate = useNavigate();
  var status = "For Approval";

  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        const response = await axios.get("https://budget-allocation-ij50.onrender.com/api/budgets")
        setBudgets(response.data);
      } catch (error) {
        console.error("Error fetching budgets:", error);
      }
    };
    fetchBudgets();
  }, []);

  const handleLogout = () => {
    navigate("/login");
  };

  const getStatus = async (id) => {
    try {
      const response = await axios.post("https://express-auro.onrender.com/api/ticket/status", {
        reference_id: id
      })
      status = response.status;
      console.log(status);
      console.log(response.status);
      return response.status;
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="home-cont">
      <div className="header-row">
        <div className="logo-title">
          <img src="/budget.png" alt="Budget Logo" className="logo" />
          <h1>Budget Allocation System</h1>
        </div>

        <div className="header-actions">
          <Link to="/create">
            <button className="create-btn">Create</button>
          </Link>

          <button className="logout-btn" onClick={handleLogout} title="Log Out">
            <img src="/logout.png" alt="Log Out" className="logout-icon" />
          </button>
        </div>
      </div>

      <div className="budget-list">
        {budgets.map((budget) => (
          <div key={budget._id} className="budget-card">
            <div className="budget-header">
              <Link to={`/budget/${budget._id}`}>
                <h3 className="clickable-title">{budget.title}</h3>
              </Link>
              <div className={`status ${getStatus(budget._id) == "Approved" ? "green" : getStatus(budget._id) == "For Approval" ? "yellow" : "red"}`}>
                {getStatus(budget._id) == "Approved" ? "Approved" : getStatus(budget._id) == "For Approval" ? "Pending" : "Declied"}
              </div>
            </div>
            <div className="budget-info">
              <table>
                <tbody>
                  <tr>
                    <td rowSpan="3" className="left-merged-column">
                      {new Date(budget.createdAt).toLocaleDateString('en-US', {
                        month: '2-digit',
                        day: '2-digit',
                        year: 'numeric'
                      })}
                    </td>
                    <td>MOOE</td>
                    <td className="money">₱ {budget.MOOE.toLocaleString()}</td>
                  </tr><tr>
                    <td>CO</td>
                    <td className="money">₱ {budget.CO.toLocaleString()}</td>
                  </tr><tr>
                    <td>PE</td>
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
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;