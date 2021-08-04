const jwt = require("jsonwebtoken");
const createError = require("http-errors");

module.exports = {
  signAccessToken: function (userId) {
    return new Promise((resolve, reject) => {
      const payload = {
        id: userId,
      };
      const secret = process.env.ACCESS_TOKEN_SECRET;
      const options = {
        expiresIn: "30s",
        issuer: "a self learner developer guy",
      };
      jwt.sign(payload, secret, options, (err, token) => {
        if (err) {
          return reject(err);
        }
        return resolve(token);
      });
    });
  },

  verifyAcessToken: function (req, res, next) {
    try {
      if (!req.headers["authorization"]) {
        throw createError.Unauthorized();
      }
      const token = req.headers["authorization"].split(" ")[1];

      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
        if (err) {
          console.log("err.name: ", err.name);
          if (err.name === "TokenExpiredError") {
            throw createError.Unauthorized("Token Expired !!!");
          } else {
            throw createError.Unauthorized();
          }
        }

        req.payload = payload;
        next();
      });
    } catch (error) {
      next(error);
    }
  },
};
