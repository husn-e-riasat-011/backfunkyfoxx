const expenseModel = require("../models/ExpenseModel");
const VehicleModel = require("../models/vehicaleModel");

//create expense report
exports.createExpense = async (req, res) => {
  try {
    const { date, catgory, amount, paymentMethod, numberPlate, details } =
      req.body;

    const existVehicle = await VehicleModel.findOne({ numberPlate });
    if (!existVehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    const expense = new expenseModel({
      vehicle: existVehicle._id,
      date,
      catgory,
      amount,
      paymentMethod,
      numberPlate,
      details,
    });

    await expense.save();
    return res
      .status(200)
      .json({ message: "expense save successfully", expense });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};

//delete expense report
exports.deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await expenseModel.findByIdAndDelete(id);
    if (!expense) {
      return res.status(404).json({
        message: "Icome Detail not found",
      });
    } else {
      return res.status(200).json({
        message: "expense report deleted successfully",
        expense,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

//update expense report
exports.updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await expenseModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!expense) {
      return res.status(404).json({
        message: "Expense Detail not found",
      });
    } else {
      return res.status(200).json({
        message: "expense updated",
        expense,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internel Server Error",
      error,
    });
  }
};

//get all expense information related to icome
exports.getAllExpense = async (req, res) => {
  try {
    const expense = await expenseModel.find();
    return res.status(200).json({
      message: "All expense are there",
      expense,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internel server error",
      error,
    });
  }
};

//get single expense info
exports.getSingleExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await expenseModel.findById(id);
    if (!expense) {
      return res.status(404).json({
        message: "Expense details not found",
      });
    } else {
      return res.status(200).json({
        message: "Expense detail",
        expense,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internel Server error",
    });
  }
};
