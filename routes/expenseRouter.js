const express = require("express");
const {
  createExpense,
  getSingleExpense,
  getAllExpense,
  deleteExpense,
  updateExpense,
} = require("../controller/expenseController");

const expenseRoute = express.Router();

expenseRoute.post("/createExpense", createExpense);
expenseRoute.get("/getSingleExpense/:id", getSingleExpense);
expenseRoute.get("/getAllExpense", getAllExpense);
expenseRoute.delete("/deleteExpense/:id", deleteExpense);
expenseRoute.patch("/updateExpense/:id", updateExpense);

module.exports = expenseRoute;
