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
      await axios.post('http://localhost:5000/api/budgets', formData);
      navigate('/');
    } catch (error) {
      console.error('Error creating budget:', error);
    }
  };

  // Update the JSX structure in CreateBudget.js
  return (
    <div className="container-2">
      <div className="logo-title-cent">
        <img src="budget.png" alt="Budget Logo" className="logo" />
        <h1>Budget Allocation System</h1>
      </div>

      <div className="create-budget">
        <h2>Create Budget</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label>MOOE</label>
            <input
              type="number"
              value={formData.MOOE}
              onChange={(e) => setFormData({ ...formData, MOOE: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label>Capital Outlay</label>
            <input
              type="number"
              value={formData.CO}
              onChange={(e) => setFormData({ ...formData, CO: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label>Personal Expenses</label>
            <input
              type="number"
              value={formData.PE}
              onChange={(e) => setFormData({ ...formData, PE: e.target.value })}
              required
            />
          </div>

          <div className="button-group">
            <Link to="/" className="back-button">
              Cancel
            </Link>
            <button type="submit" className="submit-button">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );

};

export default CreateBudget;