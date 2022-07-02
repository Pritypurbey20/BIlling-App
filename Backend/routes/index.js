const router = require("express").Router();
const usercontroller = require("../controller/user");
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const clientId = "1063954607620-8s9j1stihb7b81f7d4b0kq809t52ikc0.apps.googleusercontent.com";
const clientKey = "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";
const  {googleLogin}  = require('../helper/GoogleAuth');

router.use(passport.initialize());

router.post("/user", usercontroller.create_user);
router.post("/login", usercontroller.login_user);



passport.use(
    new GoogleStrategy({
        clientID: clientId,
        clientSecret: clientKey,
        callbackURL: '/auth/google/callback'
        
    },
    (accessToken, refreshToken, profile, done) => {
        return done(null, profile)
    })
);

router.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
    })
);

passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((user, done) => {
	done(null, user);
});

router.get(
	"/auth/google/callback",
	passport.authenticate("google", { failureRedirect: "/failed" }),
	googleLogin
);

module.exports = router;
