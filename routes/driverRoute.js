const express = require("express");
const {
  createDriver,
  updateDriver,
  deleteDriver,
  getSingleDriver,
  getAllDriver,
} = require("../controller/driverController");

const driverRoute = express.Router();

driverRoute.post("/createDriver", createDriver);
driverRoute.patch("/updateDriver/:id", updateDriver);
driverRoute.delete("/deleteDriver/:id", deleteDriver);
driverRoute.get("/getSingleDriver/:id", getSingleDriver);
driverRoute.get("/getAllDriver", getAllDriver);

module.exports = driverRoute;
