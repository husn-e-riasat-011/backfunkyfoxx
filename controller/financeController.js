const financeModel = require("../models/FinancialModel");

//create finance report
exports.createFinance = async (req, res) => {
  try {
    const {
      taxes,
      income,
      expense,
      profitable,
      grossProfit,
      opertaingExpense,
    } = req.body;
    const finance = new financeModel(req.body);
    await finance.save();
    return res.status(200).json({
      message: "finance Report Created",
      finance,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internel server error",
      error,
    });
  }
};

//delete finance report
exports.deleteFinance = async (req, res) => {
  try {
    const { id } = req.params;
    const finance = await financeModel.findByIdAndDelete(id);
    if (!finance) {
      return res.status(404).json({
        message: "finance Detail not found",
      });
    } else {
      return res.status(200).json({
        message: "finance report deleted successfully",
        finance,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

//update finance report
exports.updateFinance = async (req, res) => {
  try {
    const { id } = req.params;
    const finance = await financeModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!finance) {
      return res.status(404).json({
        message: "Finance Detail not found",
      });
    } else {
      return res.status(200).json({
        message: "finance updated",
        finance,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internel Server Error",
      error,
    });
  }
};

//get all finance information related to icome
exports.getAllFinance = async (req, res) => {
  try {
    const finance = await financeModel.find();
    return res.status(200).json({
      message: "All Finance are there",
      finance,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internel server error",
      error,
    });
  }
};

//get single finance info
exports.getSingleFinance = async (req, res) => {
  try {
    const { id } = req.params;
    const finance = await financeModel.findById(id);
    if (!finance) {
      return res.status(404).json({
        message: "finance details not found",
      });
    } else {
      return res.status(200).json({
        message: "finance detail",
        finance,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internel Server error",
    });
  }
};
