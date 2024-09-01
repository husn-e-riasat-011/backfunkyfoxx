const mongoose = require("mongoose");

const Rental = new mongoose.Schema(
  {
    startdate: {
      type: String,
    },
    enddate: {
      type: String,
    },
    rate: {
      type: String,
    },
    days: {
      type: String,
    },
    totolCost: {
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

const RentalModel = new mongoose.model("rental", Rental);

module.exports = RentalModel;
