const express = require("express");

const mongoose = require("mongoose");

const mongodb = require("mongodb");

const cors = require("cors");

const student = require("./schema");

//env file configuration
require('dotenv').config();

const app = express();

app.use(cors());

app.use(express.json());

//uri for the database
uri = process.env.db;

//check mongoose connection
const connection = mongoose.connection;

connection.on('error', error => {
  console.error('Connection error:', error);
});

connection.once('open', () => {
  console.log('Connection successful');
});

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// get all documents
app.get('/', async (req, res) => {
    try {
      const result = await student.find({});
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'An error occurred' });
    }
});

// get a data for specific name
app.get('/:name', async (req, res) => {
  const name= req.params.name;
  query1 = {"Name" :`${name}`}
  console.log(query1);
  try {
    const result = await student.findOne(query1);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// get a data for specific name and age
app.get('/:name/:age', async (req, res) => {
  const name= req.params.name;
  const age = req.params.age;
  query2 = {"Name" :`${name}`,"Age" :`${age}`}
  console.log(query2);
  try {
    const result = await student.findOne(query2);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// post a student
app.post('/insert', async (req,res) =>{
  const result = await student.create(req.body);
  res.status(200).json(result);
});

// delete a student
app.delete('/:id', async (req,res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const result = await student.deleteOne({ _id: new mongodb.ObjectId(id) });
    if (result.deletedCount === 0) {
      res.status(404).json({ error: 'Student not found' });
    } else {
      res.status(200).json({ message: 'Student deleted successfully' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// update a student details
app.put('/', async (req, res) => {
  console.log(req.body);
  try {
    const filter = { Name: req.body.Name };
    const update = req.body;
    console.log(filter,update)
    const result = await student.updateOne(filter, update);
    console.log(result);
    if (result.nModified === 1) {
      res.json("Updated successfully");
    } else {
      res.json("No student found with the provided name");
    }
  } catch (error) {
    res.json(error);
  }
});

// running the app
app.listen(3000,()=>{
    console.log("app started on port 3000");
});

