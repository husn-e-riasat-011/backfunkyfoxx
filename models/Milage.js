const mongoose = require("mongoose");

const Milage = new mongoose.Schema(
  {
    kilometer: {
      type: Number,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "vehicles",
    },
  },
  { timestamps: true }
);

const MilageModel = new mongoose.model("milage", Milage);

module.exports = MilageModel;
