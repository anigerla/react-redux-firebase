//imports only base features from the firebase (we don't need everything from firebase)
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyA78kva_bllUHILw6_tRNtJTknawDhVpsI",
    authDomain: "marioplan2019.firebaseapp.com",
    databaseURL: "https://marioplan2019.firebaseio.com",
    projectId: "marioplan2019",
    storageBucket: "marioplan2019.appspot.com",
    messagingSenderId: "484629088696"
};
firebase.initializeApp(config);
firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase;