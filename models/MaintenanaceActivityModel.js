const mongoose = require("mongoose");

const MaintenaneActivity = new mongoose.Schema(
  {
    date: {
      type: Date,
      default: Date.now,
    },
    duration: {
      type: String,
    },
    cost: {
      type: String,
    },
    serviceProvider: {
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

const MaintenanceActivityModel = new mongoose.model(
  "maintenanceActivity",
  MaintenaneActivity
);

module.exports = MaintenanceActivityModel;
