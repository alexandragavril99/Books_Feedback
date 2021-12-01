const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

const serviceAccount = require("../firebase_credentials/tic-project-e7eb1-firebase-adminsdk-evl29-58268ace1e.json");

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

module.exports = db;
