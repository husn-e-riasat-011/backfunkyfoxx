const express = require("express");
const fineRoute = express.Router();
const {
  createFine,
  deleteFine,
  updateFine,
  getSingleFine,
  getAllFine,
} = require("../controller/fineController");

fineRoute.post("/createFine", createFine);
fineRoute.delete("/deletAccident/:id", deleteFine);
fineRoute.patch("/updateAccident/:id", updateFine);
fineRoute.get("/getSingleAccident/:id", getSingleFine);
fineRoute.get("/getAllAccident", getAllFine);

module.exports = fineRoute;
