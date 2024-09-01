const adminModel = require("../models/Admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const transporter = require("../middleware/transporter");

const createAdmin = async (req, res) => {
  const hashpassword = await bcrypt.hash(req.body.password, 10);
  try {
    const regiteradmin = new adminModel({
      name: req.body.name,
      email: req.body.email,
      password: hashpassword,
    });
    await regiteradmin.save();
    res.status(201).json({
      success: true,
      message: "user created",
      regiteradmin,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "some error coming",
      err: error,
    });
  }
};
const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: "all felid required" });
    }
    const Admin = await adminModel.findOne({ email });
    // console.log(Admin);

    if (!Admin) {
      return res.status(400).json({ message: "user email not found" });
    }
    const ispasswordVaild = await bcrypt.compare(password, Admin.password);
    // console.log(ispasswordVaild);

    if (!ispasswordVaild) {
      return res.status(402).json({ message: "invaild password" });
    }
    // const token = jwt.sign(
    //   { userId: Admin._id, email: Admin.email },
    //   process.env.JWT_SECRET,
    //   { expiresIn: "1d" }
    // );

    return res.status(201).json({
      success: true,
      data: Admin,
      // token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getAdmin = async (request, response) => {
  try {
    const { id } = request.params;
    const Admin = await adminModel.findById(id);
    // console.log(Admin);
    if (!Admin) {
      response.status(404).json({ message: "user not found" });
    }
    response.status(201).json({
      success: true,
      message: `this id ${id} Admin is`,
      Admin,
    });
  } catch (error) {
    response.status(500).json({
      success: false,
      message: error.message,
      err: error,
    });
  }
};
const delAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const Admin = await adminModel.findByIdAndDelete(id);
    res.status(201).json({
      success: true,
      message: `this id ${id} has been deleted successfully`,
      Admin,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "some error coming",
      err: error,
    });
  }
};
const updateAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    if (req.body.password) {
      // Hash the new password
      body.password = await bcrypt.hash(req.body.password, 10);
    }
    const updatePerson = await adminModel.findByIdAndUpdate(id, body, {
      new: true,
    });

    res.status(201).json({
      success: true,
      message: `this id ${id} has been updated successfully`,
      updatePerson,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "some error coming",
      err: error,
    });
  }
};
const changepassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { oldpassword, newpassword, confirmpassword } = req.body;
    if (!oldpassword || !newpassword || !confirmpassword) {
      return res.status(400).json({ message: "all feild required" });
    }
    if (newpassword !== confirmpassword) {
      return res.status(404).json({ message: "password not matched" });
    }
    const userexist = await adminModel.findById(id);
    if (!userexist) {
      return res.status(404).json({ message: "not found" });
    }
    const compairepassword = await bcrypt.compare(
      oldpassword,
      userexist.password
    );
    if (!compairepassword) {
      return res.status(404).json({ message: "incorrect password" });
    }
    const hashpassword = await bcrypt.hash(newpassword, 10);
    await adminModel.findByIdAndUpdate(id, {
      $set: { password: hashpassword },
    });
    return res.status(201).json({
      success: true,
      message: "password upDataed",
      userexist,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
      err: error.message,
    });
  }
};
const forgotPasswordEmail = async (req, res) => {
  const { email } = req.body;
  try {
    const Admin = await adminModel.findOne({ email });
    // console.log(Admin);
    if (!Admin) {
      return res.status(404).json({ mesg: "User not found with this email" });
    }

    const token = jwt.sign(
      { userId: Admin._id, email: Admin.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    console.log(token);
    const resetPasswordUrl = `${process.env.FRONTEND_URL}/newpassword/${token}`;

    const mailOptions = {
      from: process.env.HOST_MAIL,
      to: email,
      subject: "Change Password",
      text: `This is a reset password \n ${resetPasswordUrl}`,
    };

    const result = await transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log("Error in email sending", err);
      } else {
        console.log(`Email sent: ${info.response}`);
      }
    });

    console.log("Print", result);

    return res.status(200).json({ mesg: `Email send to ${email}`, result });
  } catch (error) {
    return res.status(500).json({ success: false, mesg: error.message });
  }
};
const forgotPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ mesg: "Token expires!" });
    }

    const { email } = decoded;

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const Admin = await adminModel.findOneAndUpdate(
      { email },
      { password: hashedPassword }
    );

    return res
      .status(200)
      .json({ mesg: "password changed successfully", Admin });
  } catch (error) {
    return res.status(500).json({ mesg: error.message });
  }
};
module.exports = {
  createAdmin,
  loginAdmin,
  getAdmin,
  delAdmin,
  updateAdmin,
  changepassword,
  forgotPasswordEmail,
  forgotPassword,
};
