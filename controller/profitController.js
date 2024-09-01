const profitModel = require("../models/ProfitModel");

//create profit report
exports.createProfit = async (req, res) => {
  try {
    const { totalIncome, totalExpense, profit } = req.body;
    const profits = new profitModel(req.body);
    await profits.save();
    return res.status(200).json({
      message: "profit created",
      profits,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internel server error",
      error,
    });
  }
};

//delete profit report
exports.deleteProfit = async (req, res) => {
  try {
    const { id } = req.params;
    const profits = await profitModel.findByIdAndDelete(id);
    if (!profits) {
      return res.status(404).json({
        message: "Profits Detail not found",
      });
    } else {
      return res.status(200).json({
        message: "Profits report deleted successfully",
        profits,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

//update profit report
exports.updateProfit = async (req, res) => {
  try {
    const { id } = req.params;
    const profits = await profitModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!profits) {
      return res.status(404).json({
        message: "Profits Detail not found",
      });
    } else {
      return res.status(200).json({
        message: "Profits updated",
        profits,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internel Server Error",
      error,
    });
  }
};

//get all profit information related to icome
exports.getAllProfit = async (req, res) => {
  try {
    const profits = await profitModel.find();
    return res.status(200).json({
      message: "All profit are there",
      profits,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internel server error",
      error,
    });
  }
};

//get single profit info
exports.getSingleProfit = async (req, res) => {
  try {
    const { id } = req.params;
    const profits = await profitModel.findById(id);
    if (!profits) {
      return res.status(404).json({
        message: "profit details not found",
      });
    } else {
      return res.status(200).json({
        message: "Profit detail",
        profits,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internel Server error",
    });
  }
};
