const express = require("express");
const {
  createMaintenance,
  getSingleMaintenance,
  getAllMaintenance,
  deleteMaintenance,
  updateMaintenance,
} = require("../controller/maintenanceController");

const maintenanceRoute = express.Router();

maintenanceRoute.post("/createMaintenance", createMaintenance);
maintenanceRoute.get("/getSingleMaintenance/:id", getSingleMaintenance);
maintenanceRoute.get("/getAllMaintenance", getAllMaintenance);
maintenanceRoute.delete("/deleteMaintenance/:id", deleteMaintenance);
maintenanceRoute.patch("/updateMaintenance/:id", updateMaintenance);

module.exports = maintenanceRoute;
