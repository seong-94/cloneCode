import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDtbSx2kBGkGdTdSvRyAlQu5HmcI7rkd7U",
  authDomain: "xclone-c9a37.firebaseapp.com",
  projectId: "xclone-c9a37",
  storageBucket: "xclone-c9a37.appspot.com",
  messagingSenderId: "217539480782",
  appId: "1:217539480782:web:c8051e357f887cf5d6149f",
  measurementId: "G-QD5VBGZ2Z0",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
