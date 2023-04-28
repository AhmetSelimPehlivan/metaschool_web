const express = require("express");
const cors = require('cors');
const cookieParser = require('cookie-parser');
const http = require("http");
const path = require('path');
const bodyParser = require('body-parser');
const authRoute = require('./routes/authRoutes')
const taskRoute = require('./routes/taskRoutes')
const app = express();
const server = http.createServer(app);
require('dotenv/config');

app.use(cors({
  origin: 'https://644b42706b8a1547b4746f7c--roaring-puppy-20a36e.netlify.app/',
  credentials: true
}));

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'https://644b42706b8a1547b4746f7c--roaring-puppy-20a36e.netlify.app/');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());

// Routes
app.use(authRoute);
app.use(taskRoute);
// --------------------------deployment------------------------------
const parentDir = path.resolve(__dirname, '..');
app.use(express.static(path.join(parentDir, '/frontend/public')));

app.get('*', (req, res) => {
  res.sendFile(path.join(parentDir, '/frontend/public/index.html'));
});
// --------------------------deployment------------------------------
server.listen(process.env.PORT || 8080)