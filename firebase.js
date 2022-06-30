import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyDT3y0RmKHMb28DkTSBKIhc5CmMMkUolgI",
    authDomain: "ejemplomovil-8955f.firebaseapp.com",
    projectId: "ejemplomovil-8955f",
    storageBucket: "ejemplomovil-8955f.appspot.com",
    messagingSenderId: "379626789643",
    appId: "1:379626789643:web:247905860a836b02c5600e",
    measurementId: "G-PJPG8BQR17"
  };
  
export const firebaseApp = initializeApp(firebaseConfig);