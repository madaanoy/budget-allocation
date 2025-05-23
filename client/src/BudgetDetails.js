import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./BudgetDetails.css";

function BudgetDetails() {
    const { id } = useParams();
    const [budget, setBudget] = useState(null);
    const [remarks, setRemarks] = useState(null);
    const [mooe, setMooe] = useState(0);
    const [co, setCo] = useState(0);
    const [ps, setPs] = useState(0);

    useEffect(() => {
        const fetchBudget = async () => {
            try {
                const response = await axios.get(`https://budget-allocation-ij50.onrender.com/api/budgets/${id}`);
                const disResponse = await axios.get(`https://budget-allocation-ij50.onrender.com/api/disbursement`)

                setBudget(response.data.budget);
                setRemarks(response.data.remarks);

                var mooe1 = Number(response.data.budget.MOOE)
                var co1 = Number(response.data.budget.CO)
                var ps1 =  Number(response.data.budget.PE)
                for (const disbursement of disResponse.data) {
                    if (disbursement.budget_id == id) {
                        if (disbursement.category == "MOOE") {
                            mooe1 -= Number(disbursement.amount)
                        } else if (disbursement.category == "CO") {
                            co1 -= Number(disbursement.amount)
                        } else if (disbursement.category == "PS") {
                            ps1 -= Number(disbursement.amount)
                        }
                    }
                }
                setMooe(mooe1)
                setCo(co1)
                setPs(ps1)

                console.log(mooe);
                console.log(co);
                console.log(ps);
            } catch (error) {
                console.error("Error fetching budget:", error);
            }
        };
        fetchBudget();
    }, [id]);

    if (!budget) {
        return <div>Loading...</div>;
    }

    const total = budget.MOOE + budget.CO + budget.PE;
    const endingBalance = 1000000 - total;

    const setActiveBudget = async () => {
        const response = await axios.post("https://fams-m6yv.onrender.com/api/activeBudgets", {
            budget_id: id
        })

        if (response.status == 201) {
            alert('Budget is now active')
        } else {
            alert('Error');
        }
    }

    return (
        <div className="details-cont">
            <div className="header-row">
                <Link to="/">
                    <button className="back-button">Return</button>
                </Link>
                <div className="logo-title">
                    <img src="/budget.png" alt="Budget Logo" className="logo" />
                    <h1>Budget Allocation System</h1>
                </div>
            </div>

            <div className="budget-details">
                <div className="details-header">
                    <h2 className="clickable-title">{budget.title}</h2>
                    {/* <Link to={`/realign/${id}`}> */}
                        <button
                            onClick={() => setActiveBudget()}
                            className="realign-btn">
                                Set Active Budget
                        </button>
                    {/* </Link> */}
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
                        </tr><tr>
                            <td colSpan="3">2024 Income</td>
                            <td className="money">500,000.00</td>
                            <td></td>
                        </tr><tr>
                            <td colSpan="3">2025 Income</td>
                            <td className="money">500,000.00</td>
                            <td></td>
                        </tr><tr className="total">
                            <td colSpan="3">TOTAL RECEIPTS</td>
                            <td className="money"><strong>1,000,000.00</strong></td>
                            <td></td>
                        </tr><tr className="section-header">
                            <td colSpan="5">Part II. Expenditure Programs</td>
                        </tr><tr className="subtotal">
                            <td colSpan="3">Maintenance and Other Operating Expenses (MOOE)</td>
                            <td className="money">{Number(budget.MOOE).toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                            {/*change with disbersement backend*/}
                            <td className="money">{mooe == null ? "XXX,XXX.XX" : mooe.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                        </tr>
                        <tr className="subtotal">
                            <td colSpan="3">Capital Outlay (CO)</td>
                            <td className="money">{Number(budget.CO).toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                            {/*change with disbersement backend*/}
                            <td className="money">{co == null ? "XXX,XXX.XX" : co.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                        </tr><tr className="subtotal">
                            <td colSpan="3">Personal Expenses (PE)</td>
                            <td className="money">{Number(budget.PE).toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                            {/*change with disbersement backend*/}
                            <td className="money">{ps == null ? "XXX,XXX.XX" : ps.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                        </tr><tr className="total">
                            <td colSpan="3">TOTAL</td>
                            <td className="money">
                                <strong>{total.toLocaleString(undefined, { minimumFractionDigits: 2 })}</strong>
                            </td>
                            {/*make dynamic that adds remaining MOOE, CO, and PE*/}
                            <td className="money">{(mooe + co + ps).toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                        </tr><tr className="ending-balance">
                            <td colSpan="3">Ending Balance</td>
                            <td className="money">
                                <strong>{endingBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</strong>
                            </td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h2 className="comments">Comments</h2>
            <div className="comments-cont">
                <p>{remarks.remarks != "" ? remarks.remarks : "The comments should appear here."}</p>
            </div>
        </div>
    );
}

export default BudgetDetails;
