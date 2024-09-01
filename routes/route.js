const express = require("express");
const {
  createAdmin,
  loginAdmin,
  getAdmin,
  delAdmin,
  updateAdmin,
  changepassword,
} = require("../controller/admincontroller");
const router = express.Router();
router.post("/createadmin", createAdmin);
router.post("/loginadmin", loginAdmin);
router.get("/getadmin/:id", getAdmin);
router.delete("/deleteadmin/:id", delAdmin);
router.patch("/updateadmin/:id", updateAdmin);
router.patch("/changepassword/:id", changepassword);
module.exports = router;
