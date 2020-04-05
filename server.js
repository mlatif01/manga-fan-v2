// Imports
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const port = process.env.PORT || 5000;
const config = require('config');

// Init Express
const app = express();

// Import Routes
const authRoute = require('./routes/api/auth');
const mangaRoute = require('./routes/api/manga');
const mangaEdenRoute = require('./routes/api/mangaEden');
const profileRoute = require('./routes/api/profile');
const otakuRoute = require('./routes/api/otaku');
const friendRoute = require('./routes/api/friend');

// DB Config
const db = config.get('mongoURI');

// Connect to DB
mongoose.connect(
  process.env.MONGODB_URI || db,
  { useNewUrlParser: true },
  () => {
    console.log('connected to DB');
  }
);

// Middleware
app.use(express.json());

// Enable All CORS requests
app.use(cors());

// Router Middleware
// In charge of sending static file requests to the client
// app.use(express.static.join((__dirname, "public")));

app.use('/api/users', authRoute);
app.use('/api/manga', mangaRoute);
app.use('/api/manga-eden', mangaEdenRoute);
app.use('/api/users/profile', profileRoute);
app.use('/api/users/otaku', otakuRoute);
app.use('/api/users/friends', friendRoute);

// Heroku Config
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html')); // relative path
  });
}

// Run server on the specified port
app.listen(port, function () {
  console.log(`Server running on ${port}...`);
});
