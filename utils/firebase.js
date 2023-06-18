// Import the functions you need from the SDKs you need
const admin = require("firebase-admin");

const serviceAccount = require("../firebase-admin-service-key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "social-media-app-e9e80.appspot.com/",
});

module.exports = admin;
