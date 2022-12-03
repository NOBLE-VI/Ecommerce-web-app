// Import the functions you need from the SDKs you need

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAKTuynmKktHhHEO7I2_sTCPgZcdxlhmiU",
  authDomain: "ecommerce-react-app-bcb7f.firebaseapp.com",
  projectId: "ecommerce-react-app-bcb7f",
  storageBucket: "ecommerce-react-app-bcb7f.appspot.com",
  messagingSenderId: "376153109841",
  appId: "1:376153109841:web:b0749bada9926d3d890f70",
  measurementId: "G-0X8L8LQBHF"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();

