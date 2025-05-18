const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const budgetSchema = new Schema({
   title: {
      type: String,
      required: true,
   },
   budgetStatus: {
      type: Boolean,
      required: true
   },
   MOOE: {
      type: Number,
      required: true,
   },
   CO: {
      type: Number,
      required: true,
   },
   PE: {
      type: Number,
      required: true,
   },
   ActMOOE: {
      type: Number,
      required: true
   },
   ActCO: {
      type: Number,
      required: true
   },
   ActPE: {
      type: Number,
      required: true
   },
   ticketId: {
      type: String,
      required: true
   },
   remarks: {
      type: String,
      required: true
   }
}, { timestamps: true });

const Budget = mongoose.model('Budget', budgetSchema);
module.exports = Budget;