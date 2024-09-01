const mongoose = require("mongoose");

const Fines = new mongoose.Schema(
  {
    fineDate: {
      type: String,
    },
    Amount: {
      type: Number,
    },
    location: {
      type: String,
    },
    Reason: {
      type: String,
    },
    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "vehicles",
    },

    driver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "driver",
    },
  },
  { timestamps: true }
);

const fineModel = new mongoose.model("fine", Fines);

module.exports = fineModel;
