const express = require("express");
const cors = require('cors');
const cookieParser = require('cookie-parser');
const http = require("http");
const bodyParser = require('body-parser');
const authRoute = require('./routes/authRoutes')
const taskRoute = require('./routes/taskRoutes')
const fireabase = require('firebase')
const app = express();
const server = http.createServer(app);
require('dotenv/config');

fireabase.initializeApp({
    apiKey: "AIzaSyBZtlRxIvjFsO8xIWpsBwCTzM6WzPuWeJw",
    authDomain: "meta-school-ae3cc.firebaseapp.com",
    databaseURL: "https://meta-school-ae3cc-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "meta-school-ae3cc",
    storageBucket: "meta-school-ae3cc.appspot.com",
    messagingSenderId: "84657342772",
    appId: "1:84657342772:web:4f3d3ae3875f2fb58abd61"
  });

app.set('trust proxy', 1) // trust first proxy
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());

// Routes
app.use(authRoute);
app.use(taskRoute);
  
server.listen(process.env.PORT)