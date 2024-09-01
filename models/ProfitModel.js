const mongoose = require("mongoose");

const profit = new mongoose.Schema(
  {
    profit: {
      type: String,
    },
    income: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "income",
      },
    ],
    expense: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "expense",
      },
    ],
  },
  { timestamps: true }
);

const profitModel = new mongoose.model("profit", profit);

module.exports = profitModel;
