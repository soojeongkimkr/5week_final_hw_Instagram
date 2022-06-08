import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyDHBKNYUc_eLs9wXP2jkGcI5-qKBtI6P5w",
  authDomain: "authex-e38a1.firebaseapp.com",
  projectId: "authex-e38a1",
  storageBucket: "authex-e38a1.appspot.com",
  messagingSenderId: "734328447224",
  appId: "1:734328447224:web:d2d7b5353efb2a7af2db0d",
  measurementId: "G-6CJKFFP3KW"
};

const app = initializeApp(firebaseConfig);



export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;