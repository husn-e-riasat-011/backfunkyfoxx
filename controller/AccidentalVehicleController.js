const express = require("express");
const AccidentModel = require("../models/AccidentModel");
const driverModel = require("../models/DriverModel");
const VehicleModel = require("../models/vehicaleModel");

//Register Accidental Vehicale
exports.createAccidentVehicle = async (req, res) => {
  try {
    const { AccidentLocation, DamageInfo, Expense, numberPlate, Email } =
      req.body;
    const existVehicle = await VehicleModel.findOne({ numberPlate });
    if (!existVehicle) {
      return res.status(404).json({
        message: "vehicle not found",
      });
    }
    const driver = await driverModel.findOne({ Email });
    // console.log(driver);
    if (!driver) {
      return res.status(404).json({
        message: "driver not found",
      });
    }

    const accident = new AccidentModel({
      vehicle: existVehicle._id,
      driver: driver._id,
      AccidentLocation,
      DamageInfo,
      Expense,
      numberPlate,
      Email,
    });

    await accident.save();

    res.status(200).json({
      message: " accident reported",
      accident,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internel server error",
    });
  }
};
//delete Accidental Vechicle
exports.deleteAccidentVehicle = async (req, res) => {
  try {
    const { id } = req.params;
    const vehicle = await AccidentModel.findByIdAndDelete(id);
    res.status(200).json({
      status: "success",
      message: "Accidental Vehicle deleted successfully",
      vehicle,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Internal server error",
      error,
    });
  }
};

//Get all Accidental Vehicle
exports.getAllAccidentVehicle = async (req, res) => {
  try {
    const vehicle = await AccidentModel.find();
    res.status(200).json({
      status: "Success",
      message: "All Accidental Vehicle",
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Internal server error",
      error,
    });
  }
};

//Get single Accidental Vehicle
exports.getSingleAccidentVehicle = async (req, res) => {
  try {
    const { id } = req.params;
    const vehicle = new AccidentModel.findById(id);
    if (!vehicle) {
      res.status(404).json({
        message: "Vehcile not found",
      });
    } else {
      res.status(201).json({
        message: "vehicle found",
        vehicle,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internel Server error",
      error,
    });
  }
};

//update Accidental Vehicle
exports.UpdateAccidentalVehicle = async (req, res) => {
  try {
    const { id } = req.params;
    const vehicle = new AccidentModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!vehicle) {
      res.status(404).json({
        message: "Vehicle not found",
      });
    } else {
      res.status(201).json({
        message: "Vehicle updated successfully",
        vehicle,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal server Error",
      error,
    });
  }
};
