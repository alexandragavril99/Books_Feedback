const db = require("../config/db");
const faker = require("faker");

const controller = {
  createBooks: async (req, res) => {
    try {
      let numberOfBooks = req.body.numberOfBooks;

      for (let i = 0; i < numberOfBooks; i++) {
        let title = faker.name.title();
        let author = faker.name.firstName() + " " + faker.name.lastName();
        let dateOfPublishing = faker.date.past();
        let type = faker.hacker.noun();
        let price = faker.commerce.price();

        const book = {
          title: title,
          author: author,
          dateOfPublishing: dateOfPublishing,
          type: type,
          price: price,
        };

        const res = await db.collection("Books").add(book);
        console.log("Added book with ID: ", res.id);
      }

      res.status(201).send({ message: "Books created." });
    } catch (err) {
      res.status(500).send(err.message);
    }
  },
};

module.exports = controller;
