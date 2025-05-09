import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./CreateBudget.css";

const CreateBudget = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    budgetStatus: false,
    MOOE: 0,
    CO: 0,
    PE: 0
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://budget-allocation-server.onrender.com', formData);
      navigate('/');
    } catch (error) {
      console.error('Error creating budget:', error);
    }
  };

  const total = formData.MOOE + formData.CO + formData.PE;
  const endingBalance = 1000000 - total;

  // Update the JSX structure in CreateBudget.js
  return (
    <div className="create-cont">
      <div className="header-row">
        <Link to="/">
          <button className="back-button">Return</button>
        </Link>
        <div className="logo-title">
          <img src="/budget.png" alt="Budget Logo" className="logo" />
          <h1>Budget Allocation System</h1>
        </div>
      </div>

      <div className="create-budget">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="input-title">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          <table className="budget-table">
            <thead>
              <tr>
                <th colSpan="3">
                  Programs, Projects, and Activities
                  <br />
                  (By Expense Class and Object of Expenditure)
                </th>
                <th>Budget Year<br />Expenditure (₱)</th>
              </tr>
            </thead>

            <tbody>
              <tr className="section-header">
                <td colSpan="4">Part I. Receipt Programs</td>
              </tr><tr>
                {/* change into dynamic content later STARTING HERE */}
                <td colSpan="3">2024 Income</td>
                <td className="money">500,000.00</td>
              </tr><tr>
                <td colSpan="3">2025 Income</td>
                <td className="money">500,000.00</td>
              </tr><tr className="total">
                <td colSpan="3">TOTAL RECEIPTS</td>
                <td className="money"><strong>1,000,000.00</strong></td>
                {/* UNTIL HERE */}
              </tr><tr className="section-header">
                <td colSpan="4">Part II. Expenditure Programs</td>
              </tr><tr className="subtotal">
                <td colSpan="3">Maintenance and Other Operating Expenses (MOOE)</td>
                <td>
                  <input
                    type="number"
                    value={formData.MOOE}
                    onChange={(e) =>
                      setFormData({ ...formData, MOOE: parseFloat(e.target.value) || 0 })
                    }
                    required
                  />
                </td>
              </tr><tr className="subtotal">
                <td colSpan="3">Capital Outlay (CO)</td>
                <td>
                  <input
                    type="number"
                    value={formData.CO}
                    onChange={(e) =>
                      setFormData({ ...formData, CO: parseFloat(e.target.value) || 0 })
                    }
                    required
                  />
                </td>
              </tr><tr className="subtotal">
                <td colSpan="3">Personal Services (PS)</td>
                <td>
                  <input
                    type="number"
                    value={formData.PE}
                    onChange={(e) =>
                      setFormData({ ...formData, PE: parseFloat(e.target.value) || 0 })
                    }
                    required
                  />
                </td>
              </tr><tr className="total">
                <td colSpan="3">TOTAL</td>
                <td className="money">
                  <strong>
                    {total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </strong>
                </td>
              </tr><tr className="ending-balance">
                <td colSpan="3">Ending Balance</td>
                <td className="money"><strong>{endingBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</strong></td>
              </tr>
            </tbody>
          </table>

          <div className="submit-btn-cont">
            <button type="submit" className="submit-button">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );

};

export default CreateBudget;
