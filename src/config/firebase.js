import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCSgcQeQFuvSftwNiUbDYYoU9qIr-c7GBs",
  authDomain: "ecomercado-app-99021.firebaseapp.com",
  projectId: "ecomercado-app-99021",
  storageBucket: "ecomercado-app-99021.appspot.com",
  messagingSenderId: "701447751931",
  appId: "1:701447751931:web:1756c058f376035ba3c85e"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();

export const db = getFirestore(app);
export const usersCollection = collection(db, "users");
export const adminCollection = collection(db, "admin");
export const notificationForAdminCollection = collection(db, "notificationForAdmin");
export const storage = getStorage(app);
