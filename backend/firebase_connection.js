const fireabase = require('firebase')

fireabase_conn = fireabase.initializeApp({
    apiKey: "AIzaSyBZtlRxIvjFsO8xIWpsBwCTzM6WzPuWeJw",
    authDomain: "meta-school-ae3cc.firebaseapp.com",
    databaseURL: "https://meta-school-ae3cc-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "meta-school-ae3cc",
    storageBucket: "meta-school-ae3cc.appspot.com",
    messagingSenderId: "84657342772",
    appId: "1:84657342772:web:4f3d3ae3875f2fb58abd61"
  });

module.exports = fireabase_conn;