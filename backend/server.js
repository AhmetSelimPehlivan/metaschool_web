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

app.use(cors({credentials: true, origin: ["https://metaschool.herokuapp.com/", process.env.BACKEND_PORT]}));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());

// Routes
app.use(authRoute);
app.use(taskRoute);

// --------------------------deployment------------------------------

// Resolve the absolute path to the parent directory of the current directory
const parentDir = path.resolve(__dirname, '..');

// Use the parent directory path to serve static files from the "frontend/public" directory
app.use(express.static(path.join(parentDir, 'frontend/public')));

// Use the parent directory path to serve the "index.html" file
app.get('*', (req, res) => {
  res.sendFile(path.join(parentDir, 'frontend/public/index.html'));
});
// --------------------------deployment------------------------------
server.listen(process.env.PORT || 8080)