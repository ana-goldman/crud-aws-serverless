const serverless = require('serverless-http');
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
const port = process.env.NODE_LOCAL_PORT || 5050;

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error(error);
  }
};

connectDB();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res, next) => {
  return res.status(200).json({
    message: 'Hello from root!',
  });
});

app.use('/', [require('./routes/employee'), require('./routes/department')]);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

exports.handler = serverless(app);
