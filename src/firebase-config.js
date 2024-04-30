
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// Firebase configuration object containing API keys and project details
const firebaseConfig = {
  apiKey: "AIzaSyCEqfAWg7CsqxLLk5DB7p_NM6hlV5XU9pg",
  authDomain: "munches-recipe-finder.firebaseapp.com",
  projectId: "munches-recipe-finder",
  storageBucket: "munches-recipe-finder.appspot.com",
  messagingSenderId: "444263619489",
  appId: "1:444263619489:web:288d66047526e7af8089e0",
};

// Initialize Firebase app with the provided configuration
const app = initializeApp(firebaseConfig);
// Get the authentication service instance from Firebase app
const auth = getAuth(app);
// Export the initialized Firebase app and authentication service instance
export {app , auth};