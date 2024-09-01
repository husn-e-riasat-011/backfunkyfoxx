const MaintenanceModel = require("../models/MaintenanceModel");

//create maintenance report
exports.createMaintenance = async (req, res) => {
  try {
    const { description, cost, vehiclePlate } = req.body;
    const maintenance = new MaintenanceModel(req.body);
    await maintenance.save();
    return res.status(200).json({
      message: "maintenance Report Created",
      maintenance,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internel server error",
      error,
    });
  }
};

//delete maintenance report
exports.deleteMaintenance = async (req, res) => {
  try {
    const { id } = req.params;
    const maintenance = await MaintenanceModel.findByIdAndDelete(id);
    if (!maintenance) {
      return res.status(404).json({
        message: "maintenance Detail not found",
      });
    } else {
      return res.status(200).json({
        message: "maintenance report deleted successfully",
        maintenance,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

//update maintenance report
exports.updateMaintenance = async (req, res) => {
  try {
    const { id } = req.params;
    const maintenance = await MaintenanceModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!maintenance) {
      return res.status(404).json({
        message: "maintenence Detail not found",
      });
    } else {
      return res.status(200).json({
        message: "maintenence updated",
        maintenance,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internel Server Error",
      error,
    });
  }
};

//get all icome information related to icome
exports.getAllMaintenance = async (req, res) => {
  try {
    const maintenance = await MaintenanceModel.find();
    return res.status(200).json({
      message: "maintenence report are there",
      maintenance,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internel server error",
      error,
    });
  }
};

//get single income info
exports.getSingleMaintenance = async (req, res) => {
  try {
    const { id } = req.params;
    const maintenance = await MaintenanceModel.findById(id);
    if (!maintenance) {
      return res.status(404).json({
        message: "maintenance details not found",
      });
    } else {
      return res.status(200).json({
        message: "maintenance detail",
        maintenance,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internel Server error",
    });
  }
};
