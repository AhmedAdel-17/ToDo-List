// src/firebaseConfig.ts
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import '@react-native-firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAOkpahHV91SvQ-mrG-j9s8LRfXo20AOFo",
  authDomain: "todolist-17462",
  projectId: "todolist-17462",
  messagingSenderId: "209903320551",
  appId: "1:209903320551:android:650d3b3053e6bf59885142"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
