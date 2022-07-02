const router = require("express").Router();
const usercontroller = require("../controller/user");

router.post("/customer", usercontroller.new_customer);
router.post("/bill", usercontroller.new_bill);
router.post("/verify/loginOTP", usercontroller.verify_login_otp);
router.post("/update", usercontroller.update);
router.delete("/delete/:id", usercontroller.delete_customers);
router.get("/dashboard",usercontroller.findDashboardData)
router.get("/allbills",usercontroller.listing_bills)
router.get("/allcustomers",usercontroller.listing_customers)
router.get("/details",usercontroller.user_details)

module.exports = router;



