const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const disbursementSchema = new Schema({
   amount: {
      type: Number,
      required: true,
   },
   category: {
      type: String,
      required: true
   },
   budget_id: {
      type: String,
      required: true
   },
   status: {
      type: String,
      required: true
   }
}, { timestamps: true });

const Budget = mongoose.model('Budget', budgetSchema);
module.exports = Budget;