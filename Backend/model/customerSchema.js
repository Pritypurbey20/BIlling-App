const mongoose = require("mongoose");
const { db } = require("./connection");

const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
  Name: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    validate: {
      validator: function (v) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: "Please enter a valid email",
    },
    required: [true, "Email required"],
  },
  Address: {
    type: String,
    required: true,
  },
  User_id: {
    type: Schema.Types.ObjectId,
    ref: "UserLoginDetails",
  },
});

module.exports = db.model("CustomerDetails", CustomerSchema);
