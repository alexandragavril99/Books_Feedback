const db = require("../config/db");
const faker = require("faker");
const bcrypt = require("bcrypt");

const controller = {
  createUsers: async (req, res) => {
    try {
      let numberOfUsers = req.body.numberOfUsers;

      for (let i = 0; i < numberOfUsers; i++) {
        let firstName = faker.name.firstName();
        let lastName = faker.name.lastName();
        let email = faker.internet.email();
        let password = await bcrypt.hash(faker.internet.password(), 10);

        const user = {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
        };

        const res = await db.collection("Users").add(user);
        console.log("Added user with ID: ", res.id);
      }
      res.status(201).send({ message: "Users created." });
    } catch (err) {
      res.status(500).send(err);
    }
  },

  addUser: async (req, res) => {
    try {
      const userRef = db.collection("Users");
      const userFound = await userRef
        .where("email", "==", req.body.email)
        .get();

      if (!userFound.empty) {
        res.status(403).send({ message: "User already registered." });
      } else {
        const user = {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: await bcrypt.hash(req.body.password, 10),
        };
        const response = await db.collection("Users").add(user);
        console.log("Added user with ID: ", response.id);
        res.status(201).send({ message: "User created." });
      }
    } catch (err) {
      res.status(500).send(err);
    }
  },

  getUser: async (req, res) => {
    try {
      const userId = req.params.id;
      const user = (await db.collection("Users").doc(userId).get()).data();

      res.status(200).send(user);
    } catch (err) {
      res.status(500).send(err);
    }
  },
};

module.exports = controller;
