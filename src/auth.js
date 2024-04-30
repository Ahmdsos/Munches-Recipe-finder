import { signOut } from 'firebase/auth'; // Import the signOut function from firebase/auth
import { auth } from './firebase-config'; // Import the auth object from firebase-config file

// Function to handle user logout
export const logout = async () => {
  try {
    // Attempt to sign out the user using Firebase authentication
    await signOut(auth);
  } catch (error) {
    // Log any errors that occur during the sign-out process
    console.error('Error during sign out:', error);
  }
};
