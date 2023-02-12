// imports
import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut, sendPasswordResetEmail, setPersistence, browserSessionPersistence, browserLocalPersistence } from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, limit, orderBy, query, startAfter, updateDoc, where } from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_AUTH_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_AUTH_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_AUTH_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_AUTH_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_AUTH_APP_ID
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const auth = getAuth();
export var error = null;
const storage = getStorage();
const db = getFirestore(app);

export function login(email, password, persistance) {
    let Persis = browserSessionPersistence

    if (persistance === true) {
        Persis = browserLocalPersistence
    }

    return setPersistence(auth, Persis)
        .then(() => {
            return signInWithEmailAndPassword(auth, email, password)
                .then(() => {
                    console.info("Logged In User (Email: " + email + ")")
                })
                .catch(err => {
                    var errorString = "";
                    console.info(err)
                    console.info(err.error)
                    console.info(err.code)
                    console.info(err.message)
                    switch (err.code) {
                        case 'auth/invalid-email':
                            errorString = 'Invalid Email';
                            break;

                        case 'auth/invalid-password':
                            errorString = 'Invalid Password';
                            break;

                        case 'auth/too-many-requests':
                            errorString = 'Too Many Requests - Reset Password';
                            break;

                        case 'auth/network-request-failed"':
                            errorString = 'No Network Connection'
                            break;

                        case 'auth/user-not-found':
                            errorString = 'User Not Found'
                            break;

                        default:
                            errorString = err.code;
                            break;
                    }
                    console.log(errorString)

                    return { error: errorString }
                })
        })
}

export function logout() {
    return signOut(auth)
        .then(() => {
            console.info("Logged Out User")
        })
        .catch(err => {
            error = err;
            console.error("Error Logging Out User" && err)
        })
}

export function forgot(email) {
    return sendPasswordResetEmail(auth, email)
        .then(() => {
            // Reset Email Sent
        })
        .catch(err => {
            switch (err.code) {
                case 'auth/user-not-found':
                    error = 'User Not Found';
                    break;

                case 'auth/too-many-requests':
                    error = 'Too Many Requests';
                    break;

                default:
                    error = err.code;
                    break;
            }
        })
}

// Custom Hook
export function useAuth(falseValue) {
    const [currentUser, setCurrentUser] = useState();

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, user => setCurrentUser(user));
        return unsub;
    }, [])

    if (currentUser === undefined && falseValue) { setCurrentUser(falseValue) }

    return currentUser;
}

// storage
export async function getUserInfo(userID) {
    try {
        const docSnap = await getDoc(doc(db, "users", userID));
        return docSnap.data();
    } catch (e) {
        console.error("Error getting user: ", e);
    }
}