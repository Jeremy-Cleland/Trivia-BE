'use strict'

require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

const User = require('./User.js');
const mongoose = require('mongoose');

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// ENDPOINTS
app.get('/test', (req, res) => {
  res.send('server is running');
});

app.get('/users', getUsers);

async function getUsers(req, res, next) {
  try {
    let allUsers = await User.find({});

    res.status(200).send(allUsers);

  } catch (error) {
    console.log(error.message);
    next(error);
  }
}

app.get('/users/:id', getSingleUser);
  
async function getSingleUser(req, res, next) {
  try {
    let id = req.params.id;
    let user = await User.findById(id); 

    res.status(200).send(user);

  } catch (error) {
    console.log(error.message);
    next(error);
  }
}

app.post('/users', newUser); 

async function newUser(req, res, next) {
  try {
    let data = req.body;
    let newUsers = await User.create(data);

    res.status(200).send(newUsers);

  } catch (error) {
    console.log(error.message);
    next(error);
  }
}

app.delete('/users/:id', deleteUser); 

async function deleteUser(req, res, next) {
  try {
    let id = req.params.id;
   await User.findByIdAndDelete(id);
    
    res.status(200).send('users deleted');

  } catch (error) {
    console.log(error.message);
    next(error);
  }
}

app.put('/users/:id',updateUser);

async function updateUser(req, res, next) {
  try {
    let id = req.params.id;
    let userData = req.body;
    let updatedUser = await User.findByIdAndUpdate(id, userData, {new: true, overwrite: true});
    

    res.status(200).send(updatedUser);

  } catch (error) {
    console.log(error.message);
    next(error);
  }
}

// ERROR ENDPOINTS
app.get('*', (req, res) => {
  res.status(404).send('Not Found');
});

app.use((error, req, res, next) => {
  res.status(500).send(error.message);
});

// mongodb connection
mongoose.connect(process.env.DB_URL);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected');
});

// server connection
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`listening on ${PORT}`));
