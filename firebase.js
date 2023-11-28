import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAIfGSxMZv4LayT1MPVmZCOZtxJ_FDcY1w",
  authDomain: "react-native-crud-44d7c.firebaseapp.com",
  projectId: "react-native-crud-44d7c",
  storageBucket: "react-native-crud-44d7c.appspot.com",
  messagingSenderId: "568701655163",
  appId: "1:568701655163:web:69a5ec49bf45cd2055aade"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { firestore, storage };