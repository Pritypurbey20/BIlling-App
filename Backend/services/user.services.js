const Users = require("../model/userSchema");
const Login = require("../model/loginSchema");

module.exports.saveUser = async (userData) => {
  return await Users.create(userData);
};

module.exports.findUser = async (query) => {
  return (user = await Users.findOne(query));
};

module.exports.loginUser = async (userData) => {
  return await Login.create(userData);
};

module.exports.findSignedUSer = async (query) => {
  return (user = await Login.findOne(query));
};

module.exports.updateLogintrys = async (email, trys) => {
  return await Login.findOneAndUpdate(email, trys);
};

module.exports.updateLoginVerify = async (email, isVerify) => {
  return await Login.findOneAndUpdate(email, isVerify);
};

module.exports.updatedetails = async (email, data) => {
  return await Users.updateOne(email, data);
};

module.exports.updateLoginAttempt = async (email , date) => {
  return await Login.findOneAndUpdate(email,date)
}