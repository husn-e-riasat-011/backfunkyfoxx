const mongoose = require("mongoose");

const complaint = new mongoose.Schema(
  {
    InspectionDate: {
      type: String,
    },
    Issus: {
      type: String,
    },
    ResolutionDate: {
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

const complaintModel = new mongoose.model("complaint", complaint);

module.exports = complaintModel;
