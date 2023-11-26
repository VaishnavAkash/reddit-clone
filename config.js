// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider,GithubAuthProvider} from 'firebase/auth';
const firebaseConfig = {
  apiKey: "AIzaSyAI9jBG4-FP0Se7jz5JDsciJu7fBiHeSCw",
  authDomain: "reddit-clone-vaishnavakash.firebaseapp.com",
  projectId: "reddit-clone-vaishnavakash",
  storageBucket: "reddit-clone-vaishnavakash.appspot.com",
  messagingSenderId: "1042141056044",
  appId: "1:1042141056044:web:55c30fc114a97e9cf8d589"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export {auth,googleProvider,githubProvider};