// Imports
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const port = process.env.PORT || 5000;

// Init Express
const app = express();

// Import Routes
const authRoute = require('./routes/api/auth');

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to DB
mongoose.connect(db, { useNewUrlParser: true }, () => {
  console.log('connected to DB');
});

// Middleware
app.use(express.json());

// Enable All CORS requests
// app.use(cors());

// Router Middleware
// In charge of sending static file requests to the client
// app.use(express.static.join((__dirname, "public")));

app.use('/api/users', authRoute);

// Run server on the specified port
app.listen(port, function() {
  console.log(`Server running on ${port}...`);
});
