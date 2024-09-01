const express = require("express");
const complaintModel = require("../models/ComplaintModel");

//create complaint
exports.createComplaint = async (req, res) => {
  try {
    const { VehiclePlate, Email, InspectionDate, Issus, ResolutionDate } =
      req.body;
    const complaint = new complaintModel(req.body);
    await complaint.save();
    return res
      .status(201)
      .json({ message: "Complaint created successfully", complaint });
  } catch (error) {
    res.status(500).json({
      message: "Internel Server Error",
      error,
    });
  }
};

//delete complain
exports.deleteComplaint = async (req, res) => {
  try {
    const { id } = req.params;
    const complaint = await complaintModel.findByIdAndDelete(id);
    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    } else {
      return res
        .status(200)
        .json({ message: "Complaint deleted successfully" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internel server error",
      error,
    });
  }
};

//update complaint
exports.updateComplain = async (req, res) => {
  try {
    const { id } = req.params;
    const complain = new complaintModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!complain) {
      return res.status(404).json({ message: "Complaint not found" });
    } else {
      return res.status(201).json({ message: "Complaint found" });
    }
  } catch (error) {
    res.status(500).josn({
      message: "Internel server error",
      error,
    });
  }
};

// get all complain
exports.getAllComplain = async (req, res) => {
  try {
    const complain = new complaintModel.find();
    if (!complain) {
      return res.status(404).json({
        message: "No complain found",
      });
    } else {
      return res.status(200).json({
        message: "All Complain",
        complain,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internel server error",
    });
  }
};

// get single complain
exports.getSingleComplain = async (req, res) => {
  try {
    const { id } = req.params;
    const complain = new complaintModel.findById(id);
    if (!complain) {
      return res.status(404).json({
        message: "complaint not found",
      });
    } else {
      return res.status(200).json({
        message: "complain in given blow",
        complain,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internel server eroor",
      error,
    });
  }
};
