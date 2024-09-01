const express = require("express");
const {
  createAdmin,
  loginAdmin,
  getAdmin,
  delAdmin,
  updateAdmin,
  changepassword,
  forgotPasswordEmail,
  forgotPassword,
} = require("../controller/admincontroller");
const adminRoute = express.Router();
adminRoute.post("/createadmin", createAdmin);
adminRoute.post("/loginadmin", loginAdmin);
adminRoute.get("/getadmin/:id", getAdmin);
adminRoute.delete("/deleteadmin/:id", delAdmin);
adminRoute.patch("/updateadmin/:id", updateAdmin);
adminRoute.patch("/changepassword/:id", changepassword);
adminRoute.post("/resetpassword", forgotPasswordEmail);
adminRoute.post("/resetpassword/password/:token", forgotPassword);
module.exports = adminRoute;
