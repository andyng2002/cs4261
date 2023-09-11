import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBpwj5I03lpbcXjJqMJS5qk9jpEPoo-hkU",
  authDomain: "cs4261-a0828.firebaseapp.com",
  projectId: "cs4261-a0828",
  storageBucket: "cs4261-a0828.appspot.com",
  messagingSenderId: "1046427410157",
  appId: "1:1046427410157:web:5925e5c6f92e63c9b436e4",
  measurementId: "G-PHEEJ88SYW"
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app()
}
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = firebase.auth();
export const db = firebase.firestore();

