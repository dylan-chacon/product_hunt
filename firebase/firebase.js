import * as firebasee from 'firebase';
import app from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from './config';

class Firebase {
    constructor() {
        if (!app.apps.length) app.initializeApp(firebaseConfig);
        this.auth = app.auth;
    }

    //registro
    async signUp(name, email, password) {
        const newUser = await firebase.auth().createUserWithEmailAndPassword(email, password);

        return await newUser.user.updateProfile({ displayName: name });
    }

    //login
    async login(email, password) {
        return firebase.auth().signInWithEmailAndPassword(email, password);
    }

    //logout
    async logOut() {
        await firebase.auth().signOut();
    }
}

const firebase = new Firebase();
 
export default firebase;
