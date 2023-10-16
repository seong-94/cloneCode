import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAzqjdH5pFTYTHADu8KTY6MHV2HMEjNYrc",
  authDomain: "twitterclone-8c6dd.firebaseapp.com",
  projectId: "twitterclone-8c6dd",
  storageBucket: "twitterclone-8c6dd.appspot.com",
  messagingSenderId: "9386575651",
  appId: "1:9386575651:web:5be6f79a4fa4568b2d2e96",
  measurementId: "G-ZEQ31P3KR6",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
