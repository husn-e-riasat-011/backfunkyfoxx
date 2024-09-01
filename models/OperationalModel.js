const mongoose = require("mongoose");

const Operational = new mongoose.Schema(
  {
    fleetUtilization: {
      type: String,
    },
    driverPerformance: {
      type: String,
    },
    tripEfficiency: {
      type: String,
    },
    comments: {
      type: String,
    },
  },
  { timestamps: true }
);

const operationalModel = new mongoose.model("operational", Operational);

module.exports = operationalModel;
