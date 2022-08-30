import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore,Timestamp } from 'firebase/firestore';
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyBIO9f2mT4dlElOcj7_6gmNrZpeoaReH8E",
  authDomain: "management-site-78abe.firebaseapp.com",
  projectId: "management-site-78abe",
  storageBucket: "management-site-78abe.appspot.com",
  messagingSenderId: "715965565051",
  appId: "1:715965565051:web:4e99e3dce090dae3f2fade",
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp)
const storage = getStorage()
 const timestamp = Timestamp.fromDate(new Date())
export {auth,db,storage}
console.log(timestamp.toDate());
