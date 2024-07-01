const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const dotenv = require('dotenv');
const QuizPage = require('./QuizPage')
const app = express();

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:', err.message));

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.use('/quiz',QuizPage)

app.use((err,req,res,next)=>{
  res.status(err.status)
  // console.log(err);
  res.send({
      error:err.status,
      message:err.message
  })
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
