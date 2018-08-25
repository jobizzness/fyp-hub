'use strict';

/* Import WebpackApp */

/* eslint-disable no-unused-vars */
import firebase from "firebase/app"

// Initialize Firebase
// TODO: Replace with your project's customized code snippet
let config = {
    apiKey: "AIzaSyA7MawaD_MRPhoUVe8AxzXH_U5hAt-65gE",
    authDomain: "fyp-hub.firebaseapp.com",
    databaseURL: "https://fyp-hub.firebaseio.com",
    projectId: "fyp-hub",
    storageBucket: "fyp-hub.appspot.com",
    messagingSenderId: "336676726576"
};

window.firebase = firebase.initializeApp(config);

import './components/bn-app';
