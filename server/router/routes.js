const express = require('express');
const router = express.Router();
const Budget = require('../models/budgetFile.js');

// create budget
router.post('/budgets', async (req, res) => {
    try {
        const budget = new Budget({
            title: req.body.title,
            budgetStatus: req.body.budgetStatus,
            MOOE: req.body.MOOE,
            CO: req.body.CO,
            PE: req.body.PE
        });
        await budget.save();
        await axios.post('https://express-auro.onrender.com/api/ticket/create/mnas', {
        reference_id: budget._id,
        title: budget.title,
      });
        res.status(201).json(budget);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.put('/budgets/:id/approve', async (req, res) => {
    try {
        const budget = await Budget.findByIdAndUpdate(
            req.params.id,
            { budgetStatus: true },
            { new: true }
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
        res.json(budget);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
