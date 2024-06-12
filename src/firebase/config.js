import  {initializeApp}  from 'firebase/app';
import { getStorage } from 'firebase/storage';
import 'firebase/auth';
import 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyA_lMkN2j7hqa3mLervstewFxR2ZVUN30Y",
  authDomain: "olx-project-a6b9c.firebaseapp.com",
  projectId: "olx-project-a6b9c",
  storageBucket: "olx-project-a6b9c.appspot.com",
  messagingSenderId: "408003889922",
  appId: "1:408003889922:web:fbb28ca9fbbc1428d0901b",
  measurementId: "G-755DNH2D34"
};

 const  firebase = initializeApp(firebaseConfig)
 const storage = getStorage(firebase);
 export default firebase

