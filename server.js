'use strict'
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

const User = require('./User.js');
const mongoose = require('mongoose');
// mongoose.connect(process.env.DB_URL);

// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function () {
//   console.log('Mongoose is connected');
// });

const PORT = process.env.PORT || 3001;
app.use(cors());
app.use(express.json());
app.get('/test', (req, res) => {
  res.send('server is running');
});

app.get('/users', getUsers);

async function getUsers(req, res, next) {
  try {
    let allUsers = await Users.find({});
    

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
    let user = await Users.findById(id);
    

    res.status(200).send(user);

  } catch (error) {
    console.log(error.message);
    next(error);
  }
}
app.post('/users', newUsers); 

async function newUsers(req, res, next) {
  try {
    let data = req.body;
    let newUsers = await Users.create(data);
    

    res.status(200).send(newUsers);

  } catch (error) {
    console.log(error.message);
    next(error);
  }
}
app.delete('/users/:id', deletedUsers); 

async function deletedUsers(req, res, next) {
  try {
    let id = req.params.id;
   await Users.findByIdAndDelete(id);
    

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
    let updatedUser = await Users.findByIdAndUpdate(id, userData, {new: true, overwrite: true});
    

    res.status(200).send(updatedUser);

  } catch (error) {
    console.log(error.message);
    next(error);
  }
}
app.get('*', (req, res) => {
  res.status(404).send('Not Found');
});

// ERROR
app.use((error, req, res, next) => {
  res.status(500).send(error.message);
});


app.listen(PORT, () => console.log(`listening on ${PORT}`));
