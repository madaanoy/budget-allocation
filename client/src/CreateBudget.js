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
      await axios.post('https://budget-allocation.onrender.com/', formData, {
  headers: {
    'Content-Type': 'application/json'
  }
});
      navigate('/');
    } catch (error) {
      console.error('Error creating budget:', error);
    }
  };

  // Update the JSX structure in CreateBudget.js
  return (
    
    <div className="create-budget">
      <div className="navigation-buttons">
        <Link to="/" className="back-button">
          &larr; Back to Home
        </Link>
      </div>

      <h2>Create New Budget</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label>MOOE:</label>
          <input
            type="number"
            value={formData.MOOE}
            onChange={(e) => setFormData({ ...formData, MOOE: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label>Capital Outlay:</label>
          <input
            type="number"
            value={formData.CO}
            onChange={(e) => setFormData({ ...formData, CO: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label>Personal Expenses:</label>
          <input
            type="number"
            value={formData.PE}
            onChange={(e) => setFormData({ ...formData, PE: e.target.value })}
            required
          />
        </div>

        <button type="submit">Submit for Approval</button>
      </form>
    </div>
  );

};

export default CreateBudget;
