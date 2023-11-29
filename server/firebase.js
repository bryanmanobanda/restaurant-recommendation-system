require("dotenv").config()

const {initializeApp, applicationDefault} = require("firebase-admin/app");

const {getFirestore} = require("firebase-admin/firestore");
//console.log(applicationDefault())

initializeApp({
    credential: applicationDefault()
})

const firestore = getFirestore()

module.exports = {
    firestore,
}