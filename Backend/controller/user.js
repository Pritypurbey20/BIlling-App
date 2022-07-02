const bcrypt = require("bcrypt");
const { genrateToken } = require("../helper/auth");
const { sendMail } = require("../helper/mail.helper");
const customer = require("../model/customerSchema")
const {
  saveUser,
  loginUser,
  findUser,
  findSignedUSer,
  updateLogintrys,
  updateLoginVerify,
  updatedetails,
  updateLoginAttempt
} = require("../services/user.services");
const {
  saveCustomer,
  saveBill,
  findCustomer,
  deleteCustomer,
  deleteBills,
  Search,
  allBills,
  allCustomer
} = require("../services/customer.services");

//To create a new user:

const create_user = async (req, res) => {
  try {
    let user = await findUser({ Email: req.body.Email });
    if (user){
      return res.json({
        status: "Failed",
        message:"Email already exists"
      });
    }
    if (!user){

      await saveUser(req.body);
      return res.status(200).json({
        status: "Success",
        message: "User created successfully..",
      });

    }
  } catch (err) {
    return res.send(err.message);
  }
};

// To login an existing user :

const login_user = async (req, res) => {
  let OTP = Math.floor(Math.random() * 10000);
  console.log(OTP)
  try {
    let user = await findUser({ Email: req.body.Email });
    if (user == null) {
      return res.json({
        status: "failed",
        message: "Email not found ! Invalid user",
      });
    }
   
    else {
      req.body.otp = OTP;
      await sendMail(req.body.Email, OTP);
      let userData = await loginUser(req.body);
      token = genrateToken(req.body.Email, userData._id);
      res.status(200).json({
        status: "Success",
        token: token,
        message: "You are logged in successfully..",
      });
    }
  } catch (err) {
    return res.send(err.message);
  }
};

//To verify logged in OTP :

const verify_login_otp = async (req, res) => {
  let details = await findSignedUSer({ Email: req.email });
  const isMatch = await bcrypt.compare(req.body.otp, details.otp);

  try {
    if (details.trys >= 3) {

      const date1 = details.lastAttempt;
      const date2 = new Date();
      const diffTime = Math.abs(date2 - date1);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60));
      // console.log((date2.getMilliseconds() - date1.getMilliseconds())/(360000));

      if ((details.lastAttempt !== undefined) && diffDays <= 1) {
        return res.json({
          status: "Blocked",
          message: "You are bloced for an hour",
        });;
      }
      if ((details.lastAttempt !== undefined ) && diffDays >= 1) {
        if (isMatch === true) {
          await updateLoginVerify({ Email: req.email }, { isVerify: true });
          return res.status(200).json({
            status: "Success",
            message: "Verification complete",
          });
        }
        if (isMatch === false) {
          await updateLogintrys({ Email: req.email }, { $inc: { trys: 1 } });
          return res.json({
            status: "Failed",
            message: "Invalid OTP",
          });
        }
      }
      await updateLoginAttempt({ Email: req.email }, { lastAttempt: Date.now() })
      return res.json({
        status: "Max",
        message: "Maximum attempt is 3",
      });
    }
    if (isMatch === true) {
      await updateLoginVerify({ Email: req.email }, { isVerify: true });
      return res.status(200).json({
        status: "Success",
        message: "Verification complete",
      });
    }
    if (isMatch === false) {
      await updateLogintrys({ Email: req.email }, { $inc: { trys: 1 } });
      return res.json({
        status: "Failed",
        message: "Invalied OTP",
      });
    }
  } catch (error) {
    return res.send(error.message);
  }
};

// To create a new customer (*Which can be done by a user*):

const new_customer = async (req, res) => {
  try {
    let details = await findSignedUSer({ Email: req.email });
    req.body.User_id = req.userId;

    if (details === null) {
      return res.json({
        status: "Failed",
        message: "You are not a valid user",
      });
    }
    if (details !== null) {
      await saveCustomer(req.body);
      return res.status(200).json({
        status: "Success",
        message: "Customer created successfully",
      });
    }
  } catch (err) {
    if (err.code === 11000) {
      return res.send("Customer's email already exists");
    }
    return res.send(err.message);
  }
};

//To create bills for any customer:

const new_bill = async (req, res) => {
  try {
    const currentDate = new Date()

    let details = await findCustomer({ User_id: req.userId });
    req.body.User_id = req.userID
    req.body.billCreatedTime = currentDate.getTime()

    if (details === null) {
      return res.json({
        status: "Failed",
        message: "No such customers exits to create a bill"
      });
    }
    if (details !== null) {
      await saveBill(req.body);
      return res.status(200).json({
        status: "Success",
        message: "Customer's bill created successfully",
      });
    }
  } catch (error) {
    console.log(error)
    res.json({ message: error });
  }
};

// To update user's details:

const update = async (req, res) => {
  try {
    req.body = JSON.parse(JSON.stringify(req.body));
    await updatedetails({ Email: req.email }, req.body);
    return res.status(200).json({
      status: "Success",
      message: "Details updated"
    });
  } catch (error) {
    res.json({ message: error });
  }
};

// To delete a customer => also delete all his bills:

const delete_customers = async (req, res) => {
  try {

    await deleteCustomer({_id : req.params.id});
    await deleteBills({customer_id:req.params.id})
    return res.status(200).json({
      status: "Success",
      message: "Deleted"
    });
  } catch (error) {
    res.json({ message: error });
  }
};

//To show bills weekly , monthly and yearly:

const findDashboardData = async (req, res, next) => {
  try {
    const { showParameter } = req.query;
    const currentDataObj = new Date();
    const firstDay = new Date();

    if (showParameter == "weekly") {
      firstDay.setDate(currentDataObj.getDate() - 7);
    } else if (showParameter == "Monthly") {
      firstDay.setMonth(currentDataObj.getMonth() - 1);
    } else {
      firstDay.setFullYear(currentDataObj.getFullYear() - 1);
    }
    
    const dbQuery = {
      billCreatedTime: {
        $gte: firstDay.getTime(),
        $lte: currentDataObj.getTime(),
      },
      userID: req.userId,
    };
    const result = await Search(dbQuery);
    if (result) {
      return res.status(200).json({ status : "success", data:result });
    } else {
      return res.status(500).send({status : "failed" , message: "error" });
    }
  } catch (error) {
    console.log(error);
  }
};

//To show all the customers:

const listing_customers = async (req,res)=>{
  
  try {
    let {page , size } = req.query
    let count = await customer.count()
  
    if (!page){
      page = 1
    }
    if (!size){
      size = 5
    }
    const limit = parseInt(size)
    const skip = (page - 1)*size

    const all_customers = await allCustomer(limit, skip);
    res.status(200).send({
      data : all_customers,
      count : count
    })
  }
  catch(error){

    res.status(500).send(error.message)
  }
}

// To show all the bills:

const listing_bills = async (req,res) => {
  try{
    const all_bill = await allBills({customer_id:req.query.customer_id})
    res.json(all_bill)
  }catch(error){
    res.json({message:error})
  }
}

const user_details = async (req,res) => {
  try {
    const details = await findUser({ Email: req.email });
    res.send(details)
  }catch(err){
    res.send(err)
  }
}


module.exports = {
  create_user,
  login_user,
  verify_login_otp,
  new_customer,
  new_bill,
  update,
  delete_customers,
  findDashboardData,
  listing_customers,
  listing_bills,
  user_details
};
