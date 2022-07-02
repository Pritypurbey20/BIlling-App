const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "infistack111@gmail.com",
    pass: "infi@111",
  },
});

module.exports.sendMail = async (mail, otp) => {
  let mailOptions = {
    from: "infistack111@gmail.com",
    to: mail,
    subject: "Email verification",
    text: `Hello, your OTP is : ${otp}`,
  };
  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      return err;
    }
  });
};
