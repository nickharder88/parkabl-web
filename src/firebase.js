import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAwyaBA5y0KaOvVzv2RqL4NXryw3DAQ4a4',
  authDomain: 'parkabl.firebaseapp.com',
  databaseURL: 'https://parkabl.firebaseio.com',
  projectId: 'parkabl',
  storageBucket: 'parkabl.appspot.com',
  messagingSenderId: '921812638836',
  appId: '1:921812638836:web:8d15f911efa9a2b6e38521',
  measurementId: 'G-GKR6Q67PNC'
};

firebase.initializeApp(firebaseConfig);

export default firebase;
