const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config/utils");

const controller = {
  login: async (req, res) => {
    try {
      const userRef = db.collection("Users");
      const snapshot = await userRef.where("email", "==", req.body.email).get();

      if (!snapshot.empty) {
        snapshot.forEach((doc) => {
          bcrypt
            .compare(req.body.password, doc.data().password)
            .then((isMatch) => {
              if (isMatch) {
                let token = jwt.sign(
                  {
                    email: doc.data().email,
                  },
                  SECRET_KEY,
                  { expiresIn: "3h" }
                );
                res.status(200).send({ token: token, message: "Logged in." });
              } else {
                res.status(400).send({ message: "Wrong password." });
              }
            });
        });
      } else {
        res.status(400).send({ message: "Email does not exist." });
      }
    } catch (err) {
      res.status(500).send(err);
    }
  },
};

module.exports = controller;
