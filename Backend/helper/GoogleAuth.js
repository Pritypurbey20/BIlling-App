const User = require("../model/userSchema")
const jwt = require("jsonwebtoken")
const { sendMail } = require("../helper/mail.helper");
const {loginUser} = require("../services/user.services")

require("dotenv").config();

exports.googleLogin = async (req, res) => {
    let OTP = Math.floor(Math.random() * 10000);
    const user_info = req.user._json;
    console.log("user_info :", user_info);

    try{
    const userData = await User.findOne({ Email: user_info.email });
    const saveUser = {}
    saveUser.Email = user_info.email
    saveUser.otp = OTP

    await loginUser(saveUser)
    console.log(saveUser)

    

    if (userData) {
        tokenData = {
            id: user_info.sub,
            Email: userData.email,
        }

        var token = jwt.sign(tokenData, process.env.JWT_SECRETKEY, {
            expiresIn: '365d'
        });

        res.cookie('token', token, {
            httpOnly: false,
            maxAge: 1000*60 *60 * 24 * 356
        });
        await sendMail(user_info.email , OTP)
        res.redirect('http://localhost:4200/VerifyLoginOTP');

    } else {

        const infoOfUser = {
            googleID: user_info.sub,
            Name: user_info.name,
            Email: user_info.email,                   
        }

        tokenData = {
            id: user_info.sub,
            email: infoOfUser.email,
        }
        let userModel = new User(infoOfUser);
        await userModel.save()
        
        var token = jwt.sign(tokenData, process.env.JWT_SECRETKEY, {
            expiresIn: '365d'
        });

        res.cookie('token', token, {
            httpOnly: false,
            maxAge: 1000*60 *60 * 24 * 356
        });

        res.redirect('http://localhost:4200/VerifyLoginOTP');
    }

    }catch(err){
       return res.send(err);
    }
}
