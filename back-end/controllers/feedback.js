const faker = require("faker");
const db = require("../config/db");

const controller = {
  createFakeFeedback: async (req, res) => {
    const numberOfFeedbackPerBook = req.params.id;

    try {
      const users = await db.collection("Users").get();
      let userList = [];
      users.forEach((user) => {
        userList.push(user.id);
      });

      const books = await db.collection("Books").get();
      let bookList = [];
      books.forEach((book) => {
        bookList.push(book.id);
      });

      for (let i = 0; i < bookList.length; i++) {
        for (let j = 0; j < numberOfFeedbackPerBook; j++) {
          let comment = faker.lorem.sentences(
            faker.datatype.number({ min: 1, max: 5 })
          );
          let grade = faker.datatype.number({ min: 1, max: 5 });
          let id = faker.random.arrayElement(userList);

          const res = await db.collection("Feedback").add({
            comment: comment,
            grade: grade,
            userId: id,
            bookId: bookList[i],
          });
        }
      }

      res.status(200).send({ message: "Fake feedback added." });
    } catch (err) {
      res.status(500).send(err);
    }
  },

  getFeedbackPerBook: async (req, res) => {
    try {
      let bookId = req.params.id;
      const feedbackSnapshot = await db
        .collection("Feedback")
        .where("bookId", "==", bookId)
        .get();

      if (feedbackSnapshot) {
        let feedbackList = [];

        feedbackSnapshot.forEach(async (doc) => {
          let feedback = {};
          feedback.id = doc.id;
          feedback.comment = doc.data().comment;
          feedback.grade = doc.data().grade;
          feedback.userId = doc.data().userId;
          feedbackList.push(feedback);
        });

        for (let item of feedbackList) {
          const user = (
            await db.collection("Users").doc(item.userId).get()
          ).data();
          item.userData = user;
        }

        res.status(200).send(feedbackList);
      } else {
        res.status(401).send({ message: "This id does not exist." });
      }
    } catch (err) {
      res.status(500).send(err);
    }
  },

  createFeedback: async (req, res) => {
    try {
      console.log(req.params.id);
      const bookId = req.params.id;

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

      const feedback = {
        comment: req.body.comment,
        grade: req.body.grade,
        userId: user.id,
        bookId: bookId,
      };

      if (!feedback.comment || !feedback.grade) {
        console.log(feedback);
        res.status(400).send({ message: "Empty fields." });
      } else {
        await db.collection("Feedback").add(feedback);
        res.status(201).send({ message: "Feedback added." });
      }
    } catch (err) {
      res.status(500).send(err);
    }
  },

  deleteFeedback: async (req, res) => {
    try {
      let feedbackId = req.params.id;
      await db.collection("Feedback").doc(feedbackId).delete();
      res.status(200).send({ message: "Feedback deleted!" });
    } catch (err) {
      res.status(500).send(err);
    }
  },

  editFeedback: async (req, res) => {
    try {
      let feedbackId = req.params.id;

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

      const updatedFeedback = {
        comment: req.body.comment,
        grade: req.body.grade,
        userId: user.id,
        bookId: req.body.bookId,
      };

      if (!updatedFeedback.comment || !updatedFeedback.grade) {
        res.status(400).send({ message: "Empty fields." });
      } else {
        await db.collection("Feedback").doc(feedbackId).update(updatedFeedback);
        res.status(200).send({ message: "Feedback updated!" });
      }
    } catch (err) {
      res.status(500).send(err);
    }
  },
};

module.exports = controller;
