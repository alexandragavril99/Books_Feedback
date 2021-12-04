const db = require("../config/db");
const faker = require("faker");

const controller = {
  createBooks: async (req, res) => {
    try {
      let numberOfBooks = req.body.numberOfBooks;

      for (let i = 0; i < numberOfBooks; i++) {
        let title = faker.name.title();
        let author = faker.name.firstName() + " " + faker.name.lastName();
        let type = faker.hacker.noun();
        let price = faker.commerce.price();

        const book = {
          title: title,
          author: author,
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

  getAllBooks: async (req, res) => {
    try {
      const booksSnapshot = await db.collection("Books").get();

      const books = [];
      booksSnapshot.forEach((book) => {
        books.push({
          id: book.id,
          data: book.data(),
        });
      });
      res.status(200).send(books);
    } catch (err) {
      res.status(500).send(err);
    }
  },

  getBookById: async (req, res) => {
    try {
      const bookId = req.params.id;

      const book = (await db.collection("Books").doc(bookId).get()).data();

      res.status(200).send(book);
    } catch (err) {
      res.status(500).send(err);
    }
  },
};

module.exports = controller;
