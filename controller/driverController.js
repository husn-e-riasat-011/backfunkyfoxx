const driverModel = require("../models/DriverModel");

//create driver report
exports.createDriver = async (req, res) => {
  try {
    const {
      licenseNumber,
      driverName,
      Email,
      phoneNumber,
      address,
      dateOfBirth,
      hireDate,
      images,
    } = req.body;
    const driver = new driverModel(req.body);
    await driver.save();
    return res.status(200).json({
      message: "driver Report Created",
      driver,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internel server error",
      error,
    });
  }
};

//delete driver report
exports.deleteDriver = async (req, res) => {
  try {
    const { id } = req.params;
    const driver = await driverModel.findByIdAndDelete(id);
    if (!driver) {
      return res.status(404).json({
        message: "driver Detail not found",
      });
    } else {
      return res.status(200).json({
        message: "driver  deleted successfully",
        driver,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

//update driver report
exports.updateDriver = async (req, res) => {
  try {
    const { id } = req.params;
    const driver = await driverModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!driver) {
      return res.status(404).json({
        message: "driver Detail not found",
      });
    } else {
      return res.status(200).json({
        message: "driver updated",
        driver,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internel Server Error",
      error,
    });
  }
};

//get all driver information related to icome
exports.getAllDriver = async (req, res) => {
  try {
    const driver = await driverModel.find();
    return res.status(200).json({
      message: "All driver are there",
      driver,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internel server error",
      error,
    });
  }
};

//get single driver info
exports.getSingleDriver = async (req, res) => {
  try {
    const { id } = req.params;
    const driver = await driverModel.findById(id);
    if (!driver) {
      return res.status(404).json({
        message: "driver details not found",
      });
    } else {
      return res.status(200).json({
        message: "driver detail",
        driver,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internel Server error",
    });
  }
};
