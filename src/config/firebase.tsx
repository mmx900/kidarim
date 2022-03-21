// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getAnalytics} from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDtDwotLHm9jA2lsGgycz-50yOPkAwgd2k",
    authDomain: "kidarim-63b5b.firebaseapp.com",
    projectId: "kidarim-63b5b",
    storageBucket: "kidarim-63b5b.appspot.com",
    messagingSenderId: "745485651935",
    appId: "1:745485651935:web:07d6de1eee08003ce23e6a",
    measurementId: "G-0ZVW6WBE5P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const analytics = getAnalytics(app);
