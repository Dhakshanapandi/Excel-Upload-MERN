const express = require('express');
const cors = require('cors')
const app = express();
const port = 5000;

app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  }));

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://hello:kavi@cluster0.wjcn8sl.mongodb.net/finaldata?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

const DataModel = mongoose.model('Data', new mongoose.Schema({
   Name:{
    type:String,

   },
   class:{
    type:Number,
   },
   Sections:{
    type:String
   },
   van:{
    type:String
   },
   fatherName:{
    type:String
   }
}));

app.use(express.json());

app.post('/upload', (req, res) => {
    console.log("upload called");

   
  const jsonData = req.body; // JSON data from the React app
  console.log(jsonData);
  DataModel.insertMany(jsonData)
  .then(() => { 
    res.status(200).send('Data uploaded to MongoDB Count');
  })
  .catch((error) => {
    res.status(500).send('Error uploading data to MongoDB: ' + error);
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
