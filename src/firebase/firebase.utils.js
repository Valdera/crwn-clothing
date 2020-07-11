import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyDfDwlmKv9sCPsAGL-SWsTRzf_w7FT03do',
  authDomain: 'crwn-db-594c8.firebaseapp.com',
  databaseURL: 'https://crwn-db-594c8.firebaseio.com',
  projectId: 'crwn-db-594c8',
  storageBucket: 'crwn-db-594c8.appspot.com',
  messagingSenderId: '645482719629',
  appId: '1:645482719629:web:73ba66b31ee4d1612835c4',
  measurementId: 'G-DYNGJQW9JC'
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({ displayName, email, createdAt, ...additionalData });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
