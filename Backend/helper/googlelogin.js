const { JsonWebTokenError } = require('jsonwebtoken');
const { isUserExist } = require('../services/user.services')
const jwt = require("jsonwebtoken");
const { usermodel } = require('../schemas/user');
require("dotenv").config();
const config = process.env;
const { googleLogin } = require('../helper/GoogleAuth');



exports. googleLogin = async (req,res) =>{

    try {
        const user_info = req.user._json;
        console.log("user_info",user_info);

        const checkUser = await usermodel.findOne({google_id : user_info.sub})
        console.log("checkUser",checkUser);
        console.log("checkUser",checkUser.role);
        console.log("checkUser",checkUser._id);



        if(checkUser != 0){

            // create token if user exist
            const token = jwt.sign(
                { user_id : checkUser._id, user_role : checkUser.role  },
                process.env.TOKEN_KEY,
                {expiresIn: "1 day"}
            )

            // Storing token in cookie
            res.cookie('token', token, {
                httpOnly: false,
                maxAge: 1000 * 60 * 60 * 24 * 356
            });

            return res.redirect('http://localhost:3000/google-login-done');
        }

        // create user if not exist
        const newGoogleUser = await usermodel.create({
            name: user_info.name,
            email: user_info.email,
            google_id: user_info.sub
        })

        const token = jwt.sign(
            { user_id : newGoogleUser._id, user_role : newGoogleUser.role  },
            process.env.TOKEN_KEY,
            {expiresIn: "1 day"}
          
        )
        // Storing token in cookieS
        res.cookie('token', token, {
            httpOnly: false,
            maxAge: 1000 * 60 * 60 * 24 * 356
        });
        console.log("Logged is SuccessFully.")

        return res.redirect('http://localhost:3000/google-login-done');

        // else{

        //     const token = jwt.sign(
        //         { user_id : checkUser._id, user_role : checkUser.role  },
        //         process.env.TOKEN_KEY,
        //         {expiresIn: "1 day"}
              
        //     )

        //     // Storing token in cookie
        //     res.cookie('token', token, {
        //         httpOnly: false,
        //         maxAge: 1000 * 60 * 60 * 24 * 356
        //     });

        //     return res.redirect('http://localhost:3000/google-login-done');
        // }
    } catch (error) {
        console.log("googleLogin",error);
    }

}
exports.googleAuthComplete = async (req,res) =>{

    try {
    console.log("h1",req.headers.token);
    const token = req.headers.token;
    console.log("HEADER :",token);

    //const decoded =  jwt.verify(token,config.TOKEN_KEY)
    const decoded = jwt.verify(token,config.TOKEN_KEY)
    req.user = decoded.user_id;
    req.role = decoded.user_role;

    const user_id = req.user;
    const role = req.role;
    console.log("req.user",user_id);
    console.log("req.role",role);

     res.send({ user_id:user_id, role:role})
        
    } catch (error) {
        console.log("googleAuthComplete",error);
    }
    
    };