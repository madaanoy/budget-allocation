const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const budgetSchema = new Schema({
   title: {
      type: String,
      required: true,
   },
   budgetStatus: {
      type: String,
      default: "For Approval"
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
      default: ""
   },
   remarks: {
      type: String,
      default: ""
   }
}, { timestamps: true });

const Budget = mongoose.model('Budget', budgetSchema);
module.exports = Budget;