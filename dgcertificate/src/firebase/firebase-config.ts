import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyA5BcJ74tYBPWo64w6kIQ7Gjogrxt7PX3o",
  authDomain: "igitcertificate.firebaseapp.com",
  projectId: "igitcertificate",
  storageBucket: "igitcertificate.appspot.com",
  messagingSenderId: "38242162944",
  appId: "1:38242162944:web:5b140da8a4c4ed2907fbe5",
  measurementId: "G-NQQYB01QQH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);