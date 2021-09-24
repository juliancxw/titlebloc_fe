import { initializeApp, getApps } from 'firebase/app';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';



// Firebase Configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
}


const Firebase = {
  signIn: async (email, password) => {
    //Initialise firebase
    initializeApp(firebaseConfig)
    const auth = await getAuth();

    return signInWithEmailAndPassword(auth, email, password);
  
  }
}


export default Firebase