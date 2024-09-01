const mongoose = require("mongoose");

const AccidentVehicle = new mongoose.Schema(
  {
    AccidentLocation: {
      type: String,
    },
    AccidentDate: {
      type: Date,
      default: Date.now,
    },
    DamageInfo: {
      type: String,
    },
    Expense: {
      type: Number,
    },
    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "vehicles",
    },
    driver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "driver",
    },
    expense: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "expense",
    },
  },
  { timestamps: true }
);

const AccidentModel = mongoose.model("AccidentVehicle", AccidentVehicle);

module.exports = AccidentModel;
