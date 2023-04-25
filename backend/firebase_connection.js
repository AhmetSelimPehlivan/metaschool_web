const fireabase = require('firebase')

fireabase_conn = fireabase.initializeApp({
    apiKey: process.env.APIKEY,
    authDomain: process.env.AUTHDOMAIN,
    databaseURL: process.env.DATABASEURL,
    projectId: process.env.PROJECTID,
    storageBucket: process.env.STORAGEBUCKET,
    messagingSenderId: process.env.SENDERID,
    appId: process.env.APPID
  });

module.exports = fireabase_conn;