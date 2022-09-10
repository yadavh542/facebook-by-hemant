// Import the functions you need from the SDKs you need
import { initializeApp,getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD1CysbVPQG7FK4Z7foTsmdILuJXqNchdE",
  authDomain: "facebook-by-hemant.firebaseapp.com",
  projectId: "facebook-by-hemant",
  storageBucket: "facebook-by-hemant.appspot.com",
  messagingSenderId: "611831566376",
  appId: "1:611831566376:web:4df4d68ffc0805bde3651d"
};

// Initialize Firebase
const firebaseApp = !getApps().length 
                    ? initializeApp(firebaseConfig)
                    : getApp();

const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export {db, storage };