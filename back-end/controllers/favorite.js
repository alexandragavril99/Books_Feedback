const db = require("../config/db");

const controller = {
  addBookToFavorites: async (req, res) => {
    try {
      let bookId = req.params.id;

      let user = {};
      await db
        .collection("Users")
        .where("email", "==", req.currentUser.email)
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            user.id = doc.id;
            user.data = doc.data();
          });
        });

      let favorites =
        user.data.favorites !== undefined ? user.data.favorites : [];
      favorites.push(bookId);

      await db.collection("Users").doc(user.id).update({
        favorites: favorites,
      });
      res.status(200).send({ message: "Book added." });
    } catch (err) {
      res.status(500).send(err);
    }
  },

  removeBookFromFavorites: async (req, res) => {
    try {
      let bookId = req.params.id;

      let user = {};
      await db
        .collection("Users")
        .where("email", "==", req.currentUser.email)
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            user.id = doc.id;
            user.data = doc.data();
          });
        });

      user.data.favorites = user.data.favorites.filter(function (item) {
        return item !== bookId;
      });

      await db.collection("Users").doc(user.id).update({
        favorites: user.data.favorites,
      });
      res.status(200).send({ message: "Book removed." });
    } catch (err) {
      res.status(500).send(err);
    }
  },
};

module.exports = controller;
