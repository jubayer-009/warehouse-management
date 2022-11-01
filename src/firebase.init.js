// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB-8fwPdWBpsWtBGJExkpGB9KNLoneRUCk",
  authDomain: "managment-service.firebaseapp.com",
  projectId: "managment-service",
  storageBucket: "managment-service.appspot.com",
  messagingSenderId: "785130717354",
  appId: "1:785130717354:web:c97af7c3c7e14798fa50d3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
export default auth;