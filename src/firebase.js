// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase'
const firebaseConfig = {
    apiKey: "AIzaSyCGUIEaikMEPoz2LW_clzr4zxKPrmBKWgc",
    authDomain: "whatsappclone-1fca3.firebaseapp.com",
    projectId: "whatsappclone-1fca3",
    storageBucket: "whatsappclone-1fca3.appspot.com",
    messagingSenderId: "767560293895",
    appId: "1:767560293895:web:e56dc204fb776c4a8694a2",
    measurementId: "G-QWYL4Q6YSK"
  };

  const firebaseApp= firebase.initializeApp(firebaseConfig);
  const db= firebaseApp.firestore();
  const auth= firebaseApp.auth();
  const provider=new firebase.auth.GoogleAuthProvider();

  export{auth,provider};
  export default db;