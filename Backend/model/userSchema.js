const mongoose = require("mongoose");
const { db } = require("./connection");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  Name: {
    type: String,
    required: [true, "Name is required"],
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
  },
  GST_no: {
    type: Number,
  },
  GoogleId : {
    type: String
  }
});

module.exports = db.model("UserDetails", UserSchema);
