import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAbtQYUIYNrdYpQmxgvNTEnjsE3SLgvDyo",
    authDomain: "estudos-react-d4762.firebaseapp.com",
    projectId: "estudos-react-d4762",
    storageBucket: "estudos-react-d4762.appspot.com",
    messagingSenderId: "893680831874",
    appId: "1:893680831874:web:c8e8322ed38d6e65b0539b",
    measurementId: "G-Z3872H7GTR"
};

const firebaseApp = initializeApp(firebaseConfig);


const db = getFirestore(firebaseApp);

const auth = getAuth(firebaseApp);

export { db, auth };