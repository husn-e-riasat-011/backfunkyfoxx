const { mongoose } = require("mongoose");

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },

  income: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "income",
    },
  ],
});
const adminModel = mongoose.model("admin", adminSchema);
module.exports = adminModel;
