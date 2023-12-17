import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDCUavEb7yfRFQh0rG1AvhSiynoSHRCWno",
  authDomain: "ecomercado-app-project.firebaseapp.com",
  projectId: "ecomercado-app-project",
  storageBucket: "ecomercado-app-project.appspot.com",
  messagingSenderId: "828207316801",
  appId: "1:828207316801:web:c04f99a616755668d6ebc0"
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
