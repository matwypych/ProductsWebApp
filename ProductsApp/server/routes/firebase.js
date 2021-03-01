const firebase = require('firebase/app')
require("firebase/firestore")
require("firebase/auth")
require("firebase/database")
const admin = require('firebase-admin');
var serviceAccount = require("../config/key.json");

const app = firebase.initializeApp({
    apiKey: "",
    authDomain: ",
    databaseURL: "",
    projectId: "",
    storageBucket: ",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
})

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://smieciolapp.firebaseio.com"
  });

const db = app.firestore()
const auth = app.auth()
const database = app.database()
const authAdmin  = admin.auth()

module.exports = {
    db: db,
    auth: auth,
    database: database,
    authAdmin: authAdmin
}