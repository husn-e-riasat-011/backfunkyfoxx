const express = require("express");
const {
  createVehicle,
  updateVehicle,
  getAllVehicle,
  getSingleVehicle,
  deleteVehicle,
  getSingleVehicleMilage,
} = require("../controller/vehicleController");

const vehicleRouter = express.Router();

vehicleRouter.post("/createVehicle", createVehicle);
vehicleRouter.patch("/updateVehicle/:id", updateVehicle);
vehicleRouter.get("/singleVehicle/:id", getSingleVehicle);
vehicleRouter.delete("/deleteVehicle/:id", deleteVehicle);
vehicleRouter.get("/allVehicle", getAllVehicle);
vehicleRouter.post("/singleVehicleMilage", getSingleVehicleMilage);

module.exports = vehicleRouter;
