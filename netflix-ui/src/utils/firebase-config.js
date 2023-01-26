
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";



const firebaseConfig = {
  apiKey: "AIzaSyDUQDgLPpEHyuKdq53PbZZ9DNE2ISLjotE",
  authDomain: "create-netflix-clone-59a13.firebaseapp.com",
  projectId: "create-netflix-clone-59a13",
  storageBucket: "create-netflix-clone-59a13.appspot.com",
  messagingSenderId: "570421267631",
  appId: "1:570421267631:web:317696dbd0fedaf8fe185a",
  measurementId: "G-JSYY9V8EFY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app);