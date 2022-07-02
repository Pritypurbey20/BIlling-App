const Customer = require("../model/customerSchema");
const Bill = require("../model/billSchema");

module.exports.saveCustomer = async (data) => {
  return await Customer.create(data);
};

module.exports.saveBill = async (data) => {
  return await Bill.create(data);
};

module.exports.findCustomer = async (query) => {
  return (user = await Customer.find(query));
};

module.exports.deleteCustomer = async (id) => {
  return Customer.deleteOne(id);
};

module.exports.deleteBills = async (id) => {
  return Bill.deleteMany(id);
};

module.exports.Search=async(query)=>{
  return await Bill.find(query, 'Total billCreatedTime')
}

module.exports.allCustomer = async (limit, skip) => {
  return Customer.find().limit(limit).skip(skip);
}

module.exports.allBills = async (id) => {
  return await Bill.find(id)
}