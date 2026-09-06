// ==========================================
// JANJUA — FIREBASE CONFIG
// ==========================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBpGwssnPxdEVJPiMsrhJNSJc_l_Nj8CME",
    authDomain: "all-in-one-marketing.firebaseapp.com",
    projectId: "all-in-one-marketing",
    storageBucket: "all-in-one-marketing.firebasestorage.app",
    messagingSenderId: "701353417673",
    appId: "1:701353417673:web:903c021d062d66c19fa618"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

export {
    app,
    auth,
    db
};
