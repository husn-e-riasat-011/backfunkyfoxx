const mongoose = require("mongoose");

const Expense = new mongoose.Schema(
  {
    date: {
      type: Date,
      default: Date.now,
    },
    catgory: {
      type: String,
    },
    amount: {
      type: String,
    },
    numberPlate: {
      type: String,
    },
    details: {
      type: String,
    },
    vehicle: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "vehicles",
      },
    ],
  },
  { timestamps: true }
);

const expenseModel = new mongoose.model("expense", Expense);

module.exports = expenseModel;
