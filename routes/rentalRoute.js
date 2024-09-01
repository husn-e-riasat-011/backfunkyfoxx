const express = require("express");
const {
  createRent,
  getSingleRent,
  getAllRent,
  deleteRent,
  updateRent,
  AssignCarToDriver,
} = require("../controller/rentalController");

const rentalRoute = express.Router();

rentalRoute.post("/createRent", createRent);
rentalRoute.get("/getSingleRent/:id", getSingleRent);
rentalRoute.get("/getAllRent", getAllRent);
rentalRoute.delete("/deleteRent/:id", deleteRent);
rentalRoute.patch("/updateRent/:id", updateRent);
rentalRoute.post("/assignCar", AssignCarToDriver);

module.exports = rentalRoute;
