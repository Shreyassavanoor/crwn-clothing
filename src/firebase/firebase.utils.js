import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyAVvrP7zJ1Y5fN_3Zg0FuJVoZzBnuT54es",
  authDomain: "crwn-db-3915d.firebaseapp.com",
  databaseURL: "https://crwn-db-3915d.firebaseio.com",
  projectId: "crwn-db-3915d",
  storageBucket: "crwn-db-3915d.appspot.com",
  messagingSenderId: "348193217774",
  appId: "1:348193217774:web:063dec1ffa197f25fbe7ff",
  measurementId: "G-CLNZJV8Q3R",
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if(!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if(!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
}

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account'});

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
