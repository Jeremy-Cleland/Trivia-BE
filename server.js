'use strict'
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const mongoose = require('mongoose');
// mongoose.connect(process.env.DB_URL);

// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function () {
//   console.log('Mongoose is connected');
// });

const PORT = process.env.PORT || 3001;
app.use(cors());
app.get('/test', (req, res) => {
  res.send('server is running');
});

app.get('/users', (req, res) => {
  res.send('server is running');
});

app.get('/users/:id', (req, res) => {
  res.send('server is running');
});
app.post('/users', (req, res) => {
  res.send('server is running');
});
app.delete('/users/:id', (req, res) => {
  res.send('server is running');
});
app.put('/users/:id', (req, res) => {
  res.send('server is running');
});

app.get('*', (req, res) => {
  res.status(404).send('Not availabe');
});

// ERROR
app.use((error, req, res, next) => {
  res.status(500).send(error.message);
});


app.listen(PORT, () => console.log(`listening on ${PORT}`));
