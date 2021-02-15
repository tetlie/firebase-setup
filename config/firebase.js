import firebase from 'firebase'

// SINGLETON
// Legge dette inn bare ett sted, ikke i hver komponent vi trenger

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJCET_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

try {
  firebase.initializeApp(firebaseConfig); // gjør firebase klar til bruk
} catch(error) {
  if (!/already exists/.test(error.message)) { // test om /dette/ finnes i error-message
    console.error('Firebase error')
  }
}

const firebaseInstance = firebase;
export default firebaseInstance;