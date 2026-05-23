const firebaseConfig = {
  apiKey: "AIzaSyARRZSg0EcLQnt8Y9rAZdxjcnB1_u3EzWc",
  authDomain: "quick-revision-pro.firebaseapp.com",
  projectId: "quick-revision-pro",
  storageBucket: "quick-revision-pro.firebasestorage.app",
  messagingSenderId: "64833520681",
  appId: "1:64833520681:web:5829f37c2a6a80c7518838"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
