const express = require('express');
const router = express.Router();
const Budget = require('../models/budgetFile.js');
const Disbursement = require('../models/disbursementFile.js');
const axios = require('axios');

// create budget
router.post('/budgets', async (req, res) => {
    try {
        console.log(req.body);
        
        const budget = new Budget({
            title: req.body.title,
            budgetStatus: "For Approval",
            MOOE: req.body.MOOE,
            ActMOOE: req.body.MOOE,
            CO: req.body.CO,
            ActCO: req.body.CO,
            PE: req.body.PE,
            ActPE: req.body.PE,
            ticketId: "",
            remarks: ""
        });
        await budget.save();
        const response = await axios.post('https://express-auro.onrender.com/api/ticket/create/budget', {
            reference_id: budget._id,
            reference_link: "https://budget-allocation.onrender.com/budget",
            title: budget.title,
        });

        const { ticketId } = response.data;

        await Budget.findByIdAndUpdate(budget._id, {
            ticketId: ticketId
        })

        res.status(201).json(budget);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.get('/disbursement/:id', async (req, res) => {
    try {
        const disbursements = Disbursement.find();
        res.json(disbursements);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
})

router.post('/disbursement', async (req, res) => {
    try {
        const disbursement = new Disbursement({
            amount: req.body.amount,
            category: req.body.category,
            budget_id: req.body.budget_id,
            status: req.body.status
        })
        await disbursement.save();
        res.status(201).json(disbursement);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
})

router.put('/budgets/update/:id', async (req, res) => {
    try {
        const status = req.body.status
        // const remarks = req.body.remarks
        const budget = await Budget.findByIdAndUpdate(
            req.params.id,
            { budgetStatus: status
             },
        );
        res.json(budget);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// get all budgets
router.get('/budgets', async (req, res) => {
    try {
        const budgets = await Budget.find();
        res.json(budgets);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// get details of specific budget
router.get('/budgets/:id', async (req, res) => {
    try {
        const budget = await Budget.findById(req.params.id);
        if (!budget) {
            return res.status(404).json({ message: 'Budget not found' });
        }

        const response = await axios.post("https://express-auro.onrender.com/api/ticket/status", {
            reference_id: req.params.id
        });

        // res.json(budget);
        res.json({
            budget: budget,
            remarks: response.data
        });
    } catch (err) {
        res.status(500).json({ message: err.response?.data });
    }
});

module.exports = router;
