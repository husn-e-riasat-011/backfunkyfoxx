const express = require("express");
const {
  createMaintenanceActivity,
  getSingleMaintenanceActivity,
  getAllMaintenanceActivity,
  deleteMaintenanceActivity,
  updateMaintenanceActivity,
} = require("../controller/maintenanceActivityController");

const maintenanceActivityRoute = express.Router();

maintenanceActivityRoute.post(
  "/createMaintenanceActivity",
  createMaintenanceActivity
);
maintenanceActivityRoute.get(
  "/getSingleMaintenanceActivity/:id",
  getSingleMaintenanceActivity
);
maintenanceActivityRoute.get(
  "/getAllMaintenanceActivity",
  getAllMaintenanceActivity
);
maintenanceActivityRoute.delete(
  "/deleteMaintenanceActivity/:id",
  deleteMaintenanceActivity
);
maintenanceActivityRoute.patch(
  "/updateMaintenanceActivity/:id",
  updateMaintenanceActivity
);

module.exports = maintenanceActivityRoute;
