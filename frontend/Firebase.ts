
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {getStorage} from "firebase/storage"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB5CTn-16Ej7X1ARvardQNDfb6jTkNGwE0",
  authDomain: "imgaesmedium.firebaseapp.com",
  projectId: "imgaesmedium",
  storageBucket: "imgaesmedium.appspot.com",
  messagingSenderId: "415956736227",
  appId: "1:415956736227:web:3df57be49bd4c934b20dd6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// storage variable allow us to ref which storage we are talking about
export const storage = getStorage(app)