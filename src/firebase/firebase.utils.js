import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: process.env.REACT_APP_BACKEND_API_KEY,
  authDomain: process.env.REACT_APP_BACKEND_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_BACKEND_DATABASE_URL,
  projectId: process.env.REACT_APP_BACKEND_PROJECT_ID,
  storageBucket: process.env.REACT_APP_BACKEND_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_BACKEND_MESSAGE_SENDER_ID,
  appId: process.env.REACT_APP_BACKEND_SENDER_APP_ID,
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
