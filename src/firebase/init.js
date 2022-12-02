// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBBIstHHthTJ2h34MdCPU93yZliwqAlR3s",
  authDomain: "fir-practice-299a3.firebaseapp.com",
  projectId: "fir-practice-299a3",
  storageBucket: "fir-practice-299a3.appspot.com",
  messagingSenderId: "769916656444",
  appId: "1:769916656444:web:f13da8b0d2c44e86279c39"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();