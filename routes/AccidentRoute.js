const express = require("express");
const accidentRoute = express.Router();
const {
  createAccidentVehicle,
  deleteAccidentVehicle,
  UpdateAccidentalVehicle,
  getSingleAccidentVehicle,
  getAllAccidentVehicle,
} = require("../controller/AccidentalVehicleController");

accidentRoute.post("/createAccident", createAccidentVehicle);
accidentRoute.delete("/deletAccident/:id", deleteAccidentVehicle);
accidentRoute.patch("/updateAccident/:id", UpdateAccidentalVehicle);
accidentRoute.get("/getSingleAccident/:id", getSingleAccidentVehicle);
accidentRoute.get("/getAllAccident", getAllAccidentVehicle);

module.exports = accidentRoute;
