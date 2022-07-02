const mongoose = require("mongoose");
const { db } = require("./connection");

const Schema = mongoose.Schema;

const BillSchema = new Schema({
  Item: {
    type:String,
    required:true
  },
  Shipping_charge: {
    type: Number,
    default: true,
  },
  Total: {
    type: Number,
    default: 0
  },
  billCreatedTime: {
    type: Date,
    required: null
  },
  Discount: {
    type: Number,
    required: true,
  },
  customer_id: {
    type: Schema.Types.ObjectId,
    ref: "CustomerDetails",
  },
  User_id: {
    type: Schema.Types.ObjectId,
    ref: "UserLoginDetails",
  },
});

module.exports = db.model("BillDetails", BillSchema);
