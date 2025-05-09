import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./RealignBudget.css";

function RealignPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [budget, setBudget] = useState(null);
    const [amount, setAmount] = useState('');

    useEffect(() => {
        const fetchBudget = async () => {
            try {
                const response = await axios.get(`https://budget-allocation-o58h.onrender.com/api/budgets/${id}`);
                setBudget(response.data);
            } catch (error) {
                console.error("Error fetching budget for realignment:", error);
            }
        };
        fetchBudget();
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate(-1); // Go back to the previous page
    };

    if (!budget) return <div>Loading...</div>;

    const total = budget.MOOE + budget.CO + budget.PE;
    const endingBalance = 1000000 - total;

    return (
        <div className="realign-cont">
            <div className="header-row">
                <Link to={`/budget/${id}`}>
                    <button className="back-button">Return</button>
                </Link>
                <div className="logo-title">
                    <img src="/budget.png" alt="Budget Logo" className="logo" />
                    <h1>Budget Allocation System</h1>
                </div>
            </div>

            <div className="budget-details">
                <div className="realign-header">
                    <h2 className="clickable-title">{budget.title}</h2>
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
                            <th>Remaining</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="section-header">
                            <td colSpan="5">Part I. Receipt Programs</td>
                        </tr>
                        <tr>
                            <td colSpan="3">2024 Income</td>
                            <td className="money">500,000.00</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td colSpan="3">2025 Income</td>
                            <td className="money">500,000.00</td>
                            <td></td>
                        </tr>
                        <tr className="total">
                            <td colSpan="3">TOTAL RECEIPTS</td>
                            <td className="money"><strong>1,000,000.00</strong></td>
                            <td></td>
                        </tr>
                        <tr className="section-header">
                            <td colSpan="5">Part II. Expenditure Programs</td>
                        </tr>
                        <tr className="subtotal">
                            <td colSpan="3">Maintenance and Other Operating Expenses (MOOE)</td>
                            <td className="money">{budget.MOOE.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                            <td></td>
                        </tr>
                        <tr className="subtotal">
                            <td colSpan="3">Capital Outlay (CO)</td>
                            <td className="money">{budget.CO.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                            <td></td>
                        </tr>
                        <tr className="subtotal">
                            <td colSpan="3">Personal Services (PS)</td>
                            <td className="money">{budget.PE.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                            <td></td>
                        </tr>
                        <tr className="total">
                            <td colSpan="3">TOTAL</td>
                            <td className="money">
                                <strong>{total.toLocaleString(undefined, { minimumFractionDigits: 2 })}</strong>
                            </td>
                            <td></td>
                        </tr>
                        <tr className="ending-balance">
                            <td colSpan="3">Ending Balance</td>
                            <td className="money">
                                <strong>{endingBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</strong>
                            </td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>

                {/* Form with one row: Budget Type | Amount */}
                <form className="realignment-form" onSubmit={handleSubmit}>
                    <div className="form-row single-row">
                        <div className="realign-form">
                            <label htmlFor="budgetType">Budget Type</label>
                            <select id="budgetType" required>
                                <option value="" disabled selected>
                                    Select Budget Type
                                </option>
                                <option value="mooe">Maintenance and Other Operating Expenses (MOOE)</option>
                                <option value="co">Capital Outlay (CO)</option>
                                <option value="ps">Personal Services (PS)</option>
                            </select>
                        </div>
                        <div className="realign-form">
                            <label htmlFor="amount">Amount</label>
                            <input
                                type="number"
                                id="amount"
                                placeholder="Enter Amount"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="confirm-btn-cont">
                        <button type="submit" className="confirm-btn">
                            Confirm
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default RealignPage;
