import { initializeApp } from "firebase/app";
import {getFirestore} from '@firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAA2T32GkzhzEp0ssxsz5m_79Q2r9s_fnQ",
  authDomain: "where-is-the-penguin.firebaseapp.com",
  projectId: "where-is-the-penguin",
  storageBucket: "where-is-the-penguin.appspot.com",
  messagingSenderId: "298915991184",
  appId: "1:298915991184:web:0b3d88736c4d93277cd215"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);