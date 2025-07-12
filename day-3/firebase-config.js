// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD-bCPYdFDjoet_DgDhNY7SgNB-bwIl5qI",
  authDomain: "book-tracker-ddd5d.firebaseapp.com",
  projectId: "book-tracker-ddd5d",
  storageBucket: "book-tracker-ddd5d.firebasestorage.app",
  messagingSenderId: "772904476154",
  appId: "1:772904476154:web:3addf88f98e4c69a195843",
  measurementId: "G-WVQL4SPBBY"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Create and export auth object
const auth = firebase.auth();
