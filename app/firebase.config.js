// Import the functions you need from the SDKs you need
import { getApp, initializeApp,getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB4jV5TBsrNuWDAiyE6rSQkvSl4hu6WQas",
    authDomain: "fotodukaan.firebaseapp.com",
    projectId: "fotodukaan",
    storageBucket: "fotodukaan.appspot.com",
    messagingSenderId: "285823732054",
    appId: "1:285823732054:web:5e51324be5a2cc25076ef7",
    measurementId: "G-ZG3WWSV8WB"
  };
  

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app)
auth.useDeviceLanguage();


export  {auth} ;