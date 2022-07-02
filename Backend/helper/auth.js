require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = {
  verifyAuthToken: async (req, res, next) => {
    const token =
      req.headers["Authorization"] ||
      req.headers["authorization"] ||
      req.headers["x-access-token"];
    if (!token) {
      return res.status(403).send("Token is required");
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRETKEY);
      req.email = decoded.email;
      req.userId = decoded.userId;

      return next();
    } catch (err) {
      console.log(err);
      return res.status(401).send("Unauthorized token");
    }
  },
  genrateToken: function (email, userId) {
    try {
      const token = jwt.sign(
        { email: email, userId: userId },
        process.env.JWT_SECRETKEY,
        {
          expiresIn: "24h",
        }
      );
      return token;
    } catch (err) {
      console.log(err);
      res.send({ status: "error", message: err.message });
    }
  },
};
