const express = require("express");
const {
  createOperational,
  getSingleOperational,
  getAllOperational,
  deleteOperational,
  updateOperational,
} = require("../controller/operationalController");

const operationRoute = express.Router();

operationRoute.post("/createOperation", createOperational);
operationRoute.get("/getSingleOperation/:id", getSingleOperational);
operationRoute.get("/getAllOperation", getAllOperational);
operationRoute.delete("/deleteOperation/:id", deleteOperational);
operationRoute.patch("/updateOperation/:id", updateOperational);

module.exports = operationRoute;
