import * as firebase from 'firebase';

const settings = { timestampsInSnapshots: true };

var firebaseConfig = {
    apiKey: "AIzaSyCqusw9wlQkBp2lk2x8I1d3PotuDZHki-U",
    authDomain: "crud-11025.firebaseapp.com",
    databaseURL: "https://crud-11025.firebaseio.com",
    projectId: "crud-11025",
    storageBucket: "crud-11025.appspot.com",
    messagingSenderId: "572397289903",
    appId: "1:572397289903:web:8bdaff51dee64ff8212f5a"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore().settings(settings);

export default firebase;