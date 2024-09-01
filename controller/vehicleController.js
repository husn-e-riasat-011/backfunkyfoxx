const express = require("express");
const VehicleModel = require("../models/vehicaleModel");
const MilageModel = require("../models/Milage");
const transport = require("../middleware/transport");
const app = express();

//create vehicle
exports.createVehicle = async (req, res) => {
  try {
    const {
      vehicleName,
      make,
      model,
      year,
      color,
      mileage,
      numberPlate,
      totalMileage,
      fuelType,
      doors,
      seats,
      price,
    } = req.body;
    const vehicle = new VehicleModel({
      vehicleName,
      make,
      model,
      year,
      numberPlate,
      totalMileage,
      color,
      mileage,
      fuelType,
      doors,
      seats,
      price,
    });
    const existVehicle = await VehicleModel.findOne({ numberPlate });

    if (!existVehicle) {
      await vehicle.save();
      res.status(200).json({
        success: true,
        message: "vehicle created successfully",
        vehicle,
      });
    } else {
      return res.status(400).json({ message: "vehicle already exist" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

//update vehicle
exports.updateVehicle = async (req, res) => {
  try {
    const { id } = req.params;
    const vehicle = await VehicleModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!vehicle) {
      return res.status(404).json({ message: "vehicle not found" });
    }
    res.status(200).send(vehicle);
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};

//get all vehicle
exports.getAllVehicle = async (req, res) => {
  try {
    const vehicle = await VehicleModel.find();
    res.status(200).json(vehicle);
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};

// get single vehicle
exports.getSingleVehicle = async (req, res) => {
  try {
    const { id } = req.params;
    const vehicle = await VehicleModel.findById(id);
    if (!vehicle) {
      return res.status(404).json({ message: "vehicle not found" });
    } else {
      res.status(200).json({
        message: "Vehicle found",
        vehicle,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error,
    });
  }
};

// delete vehicle
exports.deleteVehicle = async (req, res) => {
  try {
    const { id } = req.params;
    const vehicle = await VehicleModel.findByIdAndDelete(id);
    if (!vehicle) {
      return res.status(404).json({ message: "vehicle not found" });
    } else {
      res.status(200).json({
        message: "Vehicle deleted",
        vehicle,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};
// exports.assignVehicle = async (req, res) => {
//   try {
//     const { vehicleNumber, driverEmail } = req.body;
//     const findvehicle = await VehicleModel.findOne({ vehicleNumber });
//     if (!findvehicle) {
//       return res.status(400).json({ message: "vehicle not found" });
//     }
//     const finddriver = await DriverModel.findOne({ driverEmail });
//     if (!finddriver) {
//       return res.status(400).json({ message: "driver not found" });
//     }
//     findvehicle.finddriver.push(finddriver._id);
//     await finddriver.save();

//milage and vehicle maintenance info
exports.getSingleVehicleMilage = async (req, res) => {
  try {
    const { numberPlate, kilometer } = req.body;
    const existVehicle = await VehicleModel.findOne({ numberPlate });
    if (!existVehicle) {
      return res.status(404).json({ message: "vehicle not found" });
    }
    console.log("totalmileage", existVehicle.totalMileage);
    // //new totol Mileage
    const newTotalMileage = existVehicle.totalMileage + kilometer;

    console.log("new total mileage", newTotalMileage);
    const newMileage = new MilageModel({
      vehicle: existVehicle._id,
      kilometer: kilometer,
    });
    existVehicle.mileage.push(newMileage);
    existVehicle.totalMileage = newTotalMileage;
    // await newMileage.save();

    if (newTotalMileage % 700 == 0) {
      const mailoption = {
        from: process.env.HOST_MAIL,
        to: "falaksherfm@gmail.com",
        subject: "Vehicle Maintenance Required",
        text: `Vehicle ${numberPlate} has completed 700 km. Vehicle maintenence required`,
      };
      transport.sendMail(mailoption, (error, info) => {
        if (error) {
          return res
            .status(401)
            .json({ success: false, message: error.message });
        } else {
          return res.status(200).json({
            success: true,
            message: "email sent successfully",
          });
          console.log("email sent" + info.response);
        }
      });
    }
    await existVehicle.save();
    return res.status(200).json({
      existVehicle,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};
