import * as firebase from 'firebase';
import firestore from 'firebase/firestore'

const settings = { timestampsInSnapshots: true };


const firebaseConfig = {
    apiKey: "AIzaSyBvTUvLTTAwD_BE50tAskxgElGTtM47-e8",
    authDomain: "crud-fa9fc.firebaseapp.com",
    databaseURL: "https://crud-fa9fc.firebaseio.com",
    projectId: "crud-fa9fc",
    storageBucket: "crud-fa9fc.appspot.com",
    messagingSenderId: "234351547227",
    appId: "1:234351547227:web:d8be9a3ba9a3ae2e1e007e",
    measurementId: "G-D7CZ0DYCE1"
};

firebase.initializeApp(config);

firebase.firestore().settings(settings);

export default firebase;