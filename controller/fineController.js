const express = require("express");
const fineModel = require("../models/FinesModel");
const VehicleModel = require("../models/vehicaleModel");
const driverModel = require("../models/DriverModel");

//create fine registeration
exports.createFine = async (req, res) => {
  try {
    console.log("test");

    const { fineDate, Amount, location, numberPlate, Email, Reason } = req.body;
    const existCar = await VehicleModel.findOne({ numberPlate });
    console.log(existCar);

    const existDriver = await driverModel.findOne({ Email });
    console.log(existDriver);

    if (!existDriver) {
      return res.status(404).json({
        message: "driver not found",
      });
    }

    if (!existCar) {
      return res.status(404).json({
        message: "car not found",
      });
    }

    const fine = new fineModel({
      vehicle: existCar._id,
      driver: existDriver._id,
      numberPlate,
      Email,
      fineDate,
      Amount,
      location,
      Reason,
    });

    await fine.save();

    res.status(200).json({
      message: "fine register successfully",
      fine,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internel server error",
      error,
    });
  }
};

//delete fine
exports.deleteFine = async (req, res) => {
  try {
    const { id } = req.params;
    const fine = new fineModel.findByIdAndDelete(id);
    if (!fine) {
      return res.status(404).json({ message: "Fine not found" });
    } else {
      return res.status(200).json({ message: "Fine deleted successfully" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internel Server Error",
      error,
    });
  }
};

//updatefine
exports.updateFine = async (req, res) => {
  try {
    const { id } = req.params;
    const fine = new fineModel.fineByIdAndUpdate(id, req.body, { new: true });
    if (!fine) {
      return res.status(404).json({ message: "Fine not found" });
    } else {
      return res.status(200).json({ message: "Fine updated successfully" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internel Server Error",
      error,
    });
  }
};

//get all fine
exports.getAllFine = async (req, res) => {
  try {
    const fine = await fineModel.find();
    if (!fine) {
      res.status(404).json({
        message: "No fine found",
      });
    } else {
      res.status(200).json({
        message: "All fine found",
        fine,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internel server error",
      error,
    });
  }
};

//get single fine details
exports.getSingleFine = async (req, res) => {
  try {
    const { id } = req.params;
    const fine = await fineModel.findById(id);
    if (!fine) {
      return res.status(404).json({
        message: "fine detail not foud",
      });
    } else {
      return res.status(201).json({
        message: "fine detail found",
        fine,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internel Server error",
      error,
    });
  }
};
