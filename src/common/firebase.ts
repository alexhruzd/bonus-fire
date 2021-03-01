import * as firebase from 'firebase';

 export const firebaseConfig: any = {
  apiKey: "AIzaSyCGeJsDmZqUse4TOu2MUksPYke6BqoZLk8",
  authDomain: "bonus-rn.firebaseapp.com",
  databaseURL: "https://bonus-rn-default-rtdb.firebaseio.com/",
  projectId: "bonus-rn",
  storageBucket: "bonus-rn.appspot.com",
  messagingSenderId: "952831747138",
  appId: "1:952831747138:android:7910f79218f5dbecd9b9db",
};
firebase.initializeApp(firebaseConfig);

export {firebase};