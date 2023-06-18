const FirebaseAdmin = require("firebase-admin");

const serviceAccountDetails = require("../firebase-admin-service-key.json");
const { bucketName } = require("../constants");

FirebaseAdmin.initializeApp({
  credential: FirebaseAdmin.credential.cert(serviceAccountDetails),
  storageBucket: bucketName,
});

module.exports = FirebaseAdmin;
