const driverModel = require("../models/DriverModel");
const RentalModel = require("../models/RentalModel");
const VehicleModel = require("../models/vehicaleModel");

//create rent report
exports.createRent = async (req, res) => {
  try {
    const {
      startdate,
      enddate,
      driverName,
      email,
      vehicle,
      vehiclePlate,
      rate,
      days,
      totolCost,
    } = req.body;
    const rent = new RentalModel(req.body);
    await rent.save();
    return res.status(200).json({
      message: "rent Report Created",
      rent,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internel server error",
      error,
    });
  }
};

//delete rent report
exports.deleteRent = async (req, res) => {
  try {
    const { id } = req.params;
    const rent = await RentalModel.findByIdAndDelete(id);
    if (!rent) {
      return res.status(404).json({
        message: "rent Detail not found",
      });
    } else {
      return res.status(200).json({
        message: "rent report deleted successfully",
        rent,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

//update rent report
exports.updateRent = async (req, res) => {
  try {
    const { id } = req.params;
    const rent = await RentalModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!rent) {
      return res.status(404).json({
        message: "rent Detail not found",
      });
    } else {
      return res.status(200).json({
        message: "rent updated",
        rent,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internel Server Error",
      error,
    });
  }
};

//get all rent information related to icome
exports.getAllRent = async (req, res) => {
  try {
    const rent = await RentalModel.find();
    return res.status(200).json({
      message: "All rent are there",
      rent,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internel server error",
      error,
    });
  }
};

//get single rent info
exports.getSingleRent = async (req, res) => {
  try {
    const { id } = req.params;
    const rent = await RentalModel.findById(id);
    if (!rent) {
      return res.status(404).json({
        message: "rent details not found",
      });
    } else {
      return res.status(200).json({
        message: "rent detail",
        rent,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internel Server error",
    });
  }
};

exports.AssignCarToDriver = async (req, res) => {
  try {
    const { numberPlate, Email, startdate, enddate, days, rate } = req.body;

    const existcar = await VehicleModel.findOne({ numberPlate });
    const existdrivers = await driverModel.findOne({ Email });
    if (!existdrivers) {
      return res.status(404).json({ message: "Driver not found" });
    }
    if (!existcar) {
      return res.status(404).json({ message: "Car not found" });
    }

    const existRental = await RentalModel.findOne({
      vehicle: existcar._id,
    });

    if (existRental) {
      return res
        .status(400)
        .json({ message: "Car already assigned to driver" });
    }

    const rental = new RentalModel({
      driver: existdrivers._id,
      vehicle: existcar._id,
      startdate,
      Email,
      numberPlate,
      enddate,
      days,
      rate,
    });
    await rental.save();

    return res.status(200).json({
      message: "car assigned to driver",
      rental,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};
