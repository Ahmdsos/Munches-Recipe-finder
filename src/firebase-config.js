// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCEqfAWg7CsqxLLk5DB7p_NM6hlV5XU9pg",
  authDomain: "munches-recipe-finder.firebaseapp.com",
  projectId: "munches-recipe-finder",
  storageBucket: "munches-recipe-finder.appspot.com",
  messagingSenderId: "444263619489",
  appId: "1:444263619489:web:288d66047526e7af8089e0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export {app , auth};