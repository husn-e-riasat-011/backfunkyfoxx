const operationalModel = require("../models/OperationalModel");

//create operational report
exports.createOperational = async (req, res) => {
  try {
    const { fleetUtilization, driverPerformance, tripEfficiency, comments } =
      req.body;
    const operational = new operationalModel(req.body);
    await operational.save();
    return res.status(200).json({
      message: "operational Report Created",
      operational,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internel server error",
      error,
    });
  }
};

//delete Operational report
exports.deleteOperational = async (req, res) => {
  try {
    const { id } = req.params;
    const operational = await operationalModel.findByIdAndDelete(id);
    if (!operationalperational) {
      return res.status(404).json({
        message: "Operational Detail not found",
      });
    } else {
      return res.status(200).json({
        message: "maintenance report deleted successfully",
        operational,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

//update Operational report
exports.updateOperational = async (req, res) => {
  try {
    const { id } = req.params;
    const operational = await operationalModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!operational) {
      return res.status(404).json({
        message: "operational Detail not found",
      });
    } else {
      return res.status(200).json({
        message: "operational updated",
        operational,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internel Server Error",
      error,
    });
  }
};

//get all operational information related to icome
exports.getAllOperational = async (req, res) => {
  try {
    const operational = await operationalModel.find();
    return res.status(200).json({
      message: "operational report are there",
      operational,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internel server error",
      error,
    });
  }
};

//get single operational info
exports.getSingleOperational = async (req, res) => {
  try {
    const { id } = req.params;
    const operational = await operationalModel.findById(id);
    if (!operational) {
      return res.status(404).json({
        message: "Operational details not found",
      });
    } else {
      return res.status(200).json({
        message: "operational detail",
        operational,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internel Server error",
    });
  }
};
