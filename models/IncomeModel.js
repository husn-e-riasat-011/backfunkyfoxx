const mongoose = require("mongoose");

const Income = new mongoose.Schema(
  {
    date: {
      type: Date,
      default: Date.now,
    },
    source: {
      type: String,
    },
    amount: {
      type: String,
    },
    drivePay: {
      type: String,
    },
    vehicle: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "vehicles",
      },
    ],
    driver: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "driver",
      },
    ],
  },
  { timestamps: true }
);

const IncomeModel = new mongoose.model("income", Income);

module.exports = IncomeModel;
