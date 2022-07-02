const mongoose = require("mongoose");
mongoose.Promise = require("bluebird");

const str = process.env.MONGO_URL;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const db = mongoose.createConnection(str, options);

db.on("disconnected", () => {
  console.log("Connection unsuccessfull..");
});

db.on("connected", () => {
  console.log("Connected to db successfully..");
});

module.exports.db = db;
