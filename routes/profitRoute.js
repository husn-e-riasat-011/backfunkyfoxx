const express = require("express");
const {
  createProfit,
  getSingleProfit,
  deleteProfit,
  updateProfit,
  getAllProfit,
} = require("../controller/profitController");

const profitRoute = express.Router();

profitRoute.post("/createprofit", createProfit);
profitRoute.get("/getSingleProfit/:id", getSingleProfit);
profitRoute.get("/getAllProfit", getAllProfit);
profitRoute.delete("/deleteProfit/:id", deleteProfit);
profitRoute.patch("/updateProfit/:id", updateProfit);

module.exports = profitRoute;
