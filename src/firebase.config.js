import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyBXmL5VMzLGc-3DQhVtG8LPnLr2Cz0lbfE",
    authDomain: "flipkart-clone-683e3.firebaseapp.com",
    projectId: "flipkart-clone-683e3",
    storageBucket: "flipkart-clone-683e3.appspot.com",
    messagingSenderId: "985943729844",
    appId: "1:985943729844:web:96c2701840b9dd4a1e99e1"
  };

  const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app)
  export const db = getFirestore(app)
  export const storage = getStorage(app)

  export default app;