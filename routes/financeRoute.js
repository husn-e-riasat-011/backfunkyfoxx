const express = require("express");
const {
  createFinance,
  getSingleFinance,
  getAllFinance,
  deleteFinance,
  updateFinance,
} = require("../controller/financeController");

const financeRoute = express.Router();

financeRoute.post("/createFinance", createFinance);
financeRoute.get("/getSingleFinance/:id", getSingleFinance);
financeRoute.get("/getAllFinanace", getAllFinance);
financeRoute.delete("/deleteFinance/:id", deleteFinance);
financeRoute.patch("/updateFinance/:id", updateFinance);

module.exports = financeRoute;
