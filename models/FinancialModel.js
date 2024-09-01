const mongoose = require("mongoose");

const financial = new mongoose.Schema(
  {
    taxes: {
      type: String,
    },
    expense: {
      type: String,
    },
    profitable: {
      type: String,
    },
    grossProfit: {
      type: String,
    },
    opertaingExpense: {
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

const financeModel = new mongoose.model("finance", financial);

module.exports = financeModel;
