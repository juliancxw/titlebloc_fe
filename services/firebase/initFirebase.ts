import { initializeApp, getApps } from 'firebase/app';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import {connectAuthEmulator} from 'firebase/auth';
//Check Dev mode for Emulator or Live
const devMode = process.env.NEXT_PUBLIC_MODE




// Firebase Configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
}

const app = initializeApp(firebaseConfig)

if (devMode == "DEV"){
    const auth = await getAuth();
    connectAuthEmulator(auth, "http://localhost:9099");
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