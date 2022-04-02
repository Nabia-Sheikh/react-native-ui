// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDMAMEEMDZm9wHm1Gl-S4Un4vKsL2UXEJY",
  authDomain: "jp-hackathon-native-4624f.firebaseapp.com",
  projectId: "jp-hackathon-native-4624f",
  storageBucket: "jp-hackathon-native-4624f.appspot.com",
  messagingSenderId: "276508149607",
  appId: "1:276508149607:web:98c199b914e35c7c92d1c2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
