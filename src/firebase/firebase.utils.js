import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
    apiKey: "AIzaSyCW16IqtkI-uPFr1Ej1FGqP3R0tnyEJzJY",
    authDomain: "ecom-db-94a32.firebaseapp.com",
    databaseURL: "https://ecom-db-94a32.firebaseio.com",
    projectId: "ecom-db-94a32",
    storageBucket: "",
    messagingSenderId: "320004969031",
    appId: "1:320004969031:web:85de6dbae483663c745762"
  }

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const createUserProfileDocument = async (userAuth, additionalData) => {

    if (!userAuth) {
        return
    }

    // console.log(firestore.doc('users/afsdfsdf'))
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();
        try {
            await userRef.set({
                displayName,email,createdAt, ...additionalData
            })
        } catch (error) {
            console.log('the error is', error);
        }
    }

    return userRef;
}


const provider = new firebase.auth.GoogleAuthProvider();

provider.setCustomParameters({promt:'select_account'});

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;