import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyARzfCrhxIFQ6LgPEFvcFCom_Gm_iTivAE",
  authDomain: "ecomercado-project.firebaseapp.com",
  projectId: "ecomercado-project",
  storageBucket: "ecomercado-project.appspot.com",
  messagingSenderId: "661260948018",
  appId: "1:661260948018:web:b5963653409a7fb245a22b",
  measurementId: "G-6F9QQEC1GM"
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
