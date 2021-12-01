const faker = require("faker");
const db = require("../config/db");

const controller = {
  createFakeReviews: async (req, res) => {
    const numberOfReviewsPerBook = req.body.numberOfReviewsPerBook;

    try {
      const users = await db.collection("Users").get();
      let userList = [];
      users.forEach((user) => {
        userList.push(user.id);
      });

      console.log(userList);

      const books = await db.collection("Books").get();
      let bookList = [];
      books.forEach((book) => {
        bookList.push(book.id);
      });

      console.log(bookList);

      bookList.forEach(async (book) => {
        for (let i = 0; i < numberOfReviewsPerBook; i++) {
          let review = faker.lorem.sentences(
            faker.datatype.number({ min: 1, max: 5 })
          );
          let stars = faker.datatype.number({ min: 1, max: 5 });
          let id = faker.random.arrayElement(userList);

          console.log(id);

          await db
            .collection("Books")
            .doc(book)
            .collection("Reviews")
            .add({
              review: review,
              stars: stars,
              userId: id,
            })
            .then((res) => {
              console.log("ID Review " + res.id);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });

      res.status(200).send({ message: "Fake reviews added." });
    } catch (err) {
      res.status(500).send(err);
    }
  },

  getReviewsPerBook: async (req, res) => {
    try {
      let bookId = req.params.id;
      const book = await db.collection("Books").doc(bookId);

      if (book) {
        const reviewsSnapshot = await db
          .collection("Books")
          .doc(bookId)
          .collection("Reviews")
          .get();

        let reviews = [];

        reviewsSnapshot.forEach(async (doc) => {
          let review = {};
          review.id = doc.id;
          review.review = doc.data().review;
          review.stars = doc.data().stars;
          review.userId = doc.data().userId;
          //  review.user = await db.collection("Users").doc(doc.data().userId);
          //  console.log(await db.collection("Users").doc(doc.data().userId).get());

          reviews.push(review);
        });
        res.status(200).send(reviews);
      } else {
        res.status(401).send({ message: "This id does not exist." });
      }
    } catch (err) {
      res.status(500).send(err);
    }
  },

  createReview: async (req, res) => {
    try {
      const bookId = req.params.id;
      const review = {
        review: req.body.review,
        stars: req.body.stars,
        userId: req.body.userId,
      };
      if (!review.review || !review.stars) {
        res.status(400).send({ message: "Empty fields." });
      } else {
        await db
          .collection("Books")
          .doc(bookId)
          .collection("Reviews")
          .add(review);
        res.status(201).send({ message: "Review added." });
      }
    } catch (err) {
      res.status(500).send(err);
    }
  },

  deleteReview: async (req, res) => {
    try {
      let bookId = req.body.bookId;
      let reviewId = req.body.reviewId;
      await db
        .collection("Books")
        .doc(bookId)
        .collection("Reviews")
        .doc(reviewId)
        .delete();
      res.status(200).send({ message: "Review deleted!" });
    } catch (err) {
      res.status(500).send(err);
    }
  },

  editReview: async (req, res) => {
    try {
      let bookId = req.body.bookId;
      let reviewId = req.body.reviewId;

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

      console.log(user);

      const updatedReview = {
        review: req.body.review,
        stars: req.body.stars,
        userId: user.id,
      };

      if (!updatedReview.review || !updatedReview.stars) {
        res.status(400).send({ message: "Empty fields." });
      } else {
        await db
          .collection("Books")
          .doc(bookId)
          .collection("Reviews")
          .doc(reviewId)
          .update(updatedReview);
        res.status(200).send({ message: "Review updated!" });
      }
    } catch (err) {
      res.status(500).send(err);
    }
  },
};

module.exports = controller;
