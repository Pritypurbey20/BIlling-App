const mongoose = require("mongoose");
const { db } = require("./connection");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const UserLoginSchema = new Schema({
  Email: {
    type: String,
    trim: true,
    lowercase: true,
    validate: {
      validator: function (v) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: "Please enter a valid email",
    },
    required: [true, "Email required"],
  },
  otp: {
    type: String,
  },
  trys: {
    type: Number,
    default: 0,
  },
  lastAttempt:{
    type:Date
  },
  isVerify: {
    type: Boolean,
    default: false,
  },
});

UserLoginSchema.pre("save", async function (next) {
  if (this.isModified("otp")) {
    this.otp = await bcrypt.hash(this.otp, 10);
  }
  next();
});

module.exports = db.model("UserLoginDetails", UserLoginSchema);
