require("dotenv").config()
import * as admin from 'firebase-admin';
import {applicationDefault, initializeApp} from "firebase-admin/app";
import {getFirestore} from "firebase-admin/firestore";

initializeApp({
    credential: applicationDefault()
})

const firestore = getFirestore()
const auth = admin.auth();

export {firestore, auth};