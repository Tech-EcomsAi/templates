import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyB-CuwvAzBQsh7iJ9rdHzck0fFGszudWLc",
    authDomain: "ecomsai-templates.firebaseapp.com",
    projectId: "ecomsai-templates",
    storageBucket: "ecomsai-templates.appspot.com",
    messagingSenderId: "224536597856",
    appId: "1:224536597856:web:7f82d32617f5d7d308ba05",
    measurementId: "G-6K2KZXCWFG"
};

// Initialize Firebase
const firebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);
const firebaseClient = getFirestore();
const firebaseAuth = getAuth();
const firebaseStorage = getStorage();

export { firebaseApp, firebaseAuth, firebaseClient, firebaseStorage };
