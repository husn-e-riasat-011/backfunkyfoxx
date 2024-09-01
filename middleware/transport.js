const nodemailer = require("nodemailer");

let transport = nodemailer.createTransport({
  hostmail: process.env.HOST_MAIL,
  service: "gmail",
  auth: {
    user: process.env.HOST_MAIL,
    pass: process.env.MAIL_PASSWORD,
  },
});

module.exports = transport;
