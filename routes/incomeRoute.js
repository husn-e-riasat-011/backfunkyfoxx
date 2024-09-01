const express = require("express");
const {
  createIncome,
  getSingleIncome,
  getAllIncome,
  deleteIncome,
  updateIncome,
} = require("../controller/incomeController");
const incomeRoute = express.Router();

incomeRoute.post("/createIncome", createIncome);
incomeRoute.get("/getSingleIncome/:id", getSingleIncome);
incomeRoute.get("/getAllIncome", getAllIncome);
incomeRoute.delete("/deleteIncome/:id", deleteIncome);
incomeRoute.patch("/updateIncome/:id", updateIncome);

module.exports = incomeRoute;
