import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDENHsrMVf2HDFqWi6fw9q6a-i76sSZNpw",
    authDomain: "chatterz-2001.firebaseapp.com",
    projectId: "chatterz-2001",
    storageBucket: "chatterz-2001.appspot.com",
    messagingSenderId: "266900766721",
    appId: "1:266900766721:web:14aae7a1f876c8782f8000",
    measurementId: "G-5SQ3RK1KXE"
  };
  
  // Initialize Firebase
  const firebaseApp = firebase.initializeApp(firebaseConfig);

  // Use these for db & auth
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  
  export { auth, db };