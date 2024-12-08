// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
apiKey: process.env.AIzaSyClEkt0D3WfSIyuB9CXB8zNPMp3hpCXJV4,
  authDomain: "aigen-aed65.firebaseapp.com",
  projectId: "aigen-aed65",
  storageBucket: "aigen-aed65.firebasestorage.app",
  messagingSenderId: "273863676985",
  appId: "1:273863676985:web:68dba1593a87270996a9e8",
  measurementId: "G-D6X2BLZ68V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app)