const MaintenanceActivityModel = require("../models/MaintenanaceActivityModel");

//create maintenance activity report
exports.createMaintenanceActivity = async (req, res) => {
  try {
    const { date, duration, cost, serviceProvider, vehicle } = req.body;
    const maintenanceActivity = new MaintenanceActivityModel(req.body);
    await maintenanceActivity.save();
    return res.status(200).json({
      message: "maintenance activity Report Created",
      maintenanceActivity,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internel server error",
      error,
    });
  }
};

//delete maintenance activity report
exports.deleteMaintenanceActivity = async (req, res) => {
  try {
    const { id } = req.params;
    const maintenanceActivity =
      await MaintenanceActivityModel.findByIdAndDelete(id);
    if (!maintenanceActivity) {
      return res.status(404).json({
        message: "maintenance Detail not found",
      });
    } else {
      return res.status(200).json({
        message: "maintenance report deleted successfully",
        maintenanceActivity,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

//update maintenance activity report
exports.updateMaintenanceActivity = async (req, res) => {
  try {
    const { id } = req.params;
    const maintenanceActivity =
      await MaintenanceActivityModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });
    if (!maintenanceActivity) {
      return res.status(404).json({
        message: "maintenence Detail not found",
      });
    } else {
      return res.status(200).json({
        message: "maintenence updated",
        maintenanceActivity,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internel Server Error",
      error,
    });
  }
};

//get all maintenanace information related to icome
exports.getAllMaintenanceActivity = async (req, res) => {
  try {
    const maintenanceActivity = await MaintenanceActivityModel.find();
    return res.status(200).json({
      message: "maintenence report are there",
      maintenanceActivity,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internel server error",
      error,
    });
  }
};

//get single maintenance Activity info
exports.getSingleMaintenanceActivity = async (req, res) => {
  try {
    const { id } = req.params;
    const maintenanceActivity = await MaintenanceActivityModel.findById(id);
    if (!maintenanceActivity) {
      return res.status(404).json({
        message: "maintenance details not found",
      });
    } else {
      return res.status(200).json({
        message: "maintenance detail",
        maintenanceActivity,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internel Server error",
    });
  }
};
