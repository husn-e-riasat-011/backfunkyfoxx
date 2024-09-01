const mongoose = require("mongoose");

const driver = new mongoose.Schema(
  {
    licenseNumber: {
      type: String,
    },
    driverName: {
      type: String,
    },
    Email: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    address: {
      type: String,
    },
    dateOfBirth: {
      type: String,
    },
    hireDate: {
      type: String,
    },
    images: {
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

const driverModel = new mongoose.model("driver", driver);

module.exports = driverModel;
