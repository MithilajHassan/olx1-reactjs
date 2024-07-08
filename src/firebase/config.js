import {initializeApp} from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBvn0AeYZ2yR04H5dHxfaXenlM9h5RBCyk",
  authDomain: "olx-2-a0709.firebaseapp.com",
  projectId: "olx-2-a0709",
  storageBucket: "olx-2-a0709.appspot.com",
  messagingSenderId: "922798449092",
  appId: "1:922798449092:web:1bc9977adac2f122580491",
  measurementId: "G-TN1LCW3LWV"
}
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)
export {auth,db,storage}
