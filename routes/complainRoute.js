const express = require("express");
const {
  createComplaint,
  updateComplain,
  deleteComplaint,
  getSingleComplain,
  getAllComplain,
} = require("../controller/complaintController");
const comaplainRoute = express.Router();

comaplainRoute.post("/createComplain", createComplaint);
comaplainRoute.patch("/updateComplain/:id", updateComplain);
comaplainRoute.delete("/deleteComplain/:id", deleteComplaint);
comaplainRoute.get("/getSingleComplain/:id", getSingleComplain);
comaplainRoute.get("/getAllComplain", getAllComplain);

module.exports = comaplainRoute;
