const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config/utils");

const checkAuthorization = function (req, res, next) {
  const token = req.headers.authorization;
  console.log(token);

  if (typeof token !== "undefined") {
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) {
        if (err.expiredAt) {
          res.status(403).send({ message: "Your token expired!" });
        } else {
          res.status(403).send({ message: "Decoding error! Incorrect token." });
        }
      } else {
        console.log(decoded.email);
        req.currentUser = decoded;
        next();
      }
    });
  } else {
    res.status(401).send({ message: "Missing token! You are not logged in." });
  }
};

module.exports = { checkAuthorization };
