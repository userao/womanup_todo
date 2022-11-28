// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAvo_oXJxjM0CbfhOao_IO9bOICMnkN97k",
  authDomain: "womanup-4b74a.firebaseapp.com",
  databaseURL: "https://womanup-4b74a-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "womanup-4b74a",
  storageBucket: "womanup-4b74a.appspot.com",
  messagingSenderId: "742923577511",
  appId: "1:742923577511:web:41199c8c49f9418f769382",
  measurementId: "G-CD3K7842V1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export default storage;