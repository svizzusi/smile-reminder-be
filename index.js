const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const passport = require('passport')
const session = require('express-session')
require('dotenv').config({path: './config/.env'})

const app = express()
const PORT = process.env.PORT || 3000

const allowedOrigins = [
    'https://www.smilesupply.net',
    'https://smilesupply.net',
    'https://smilesupplyfe.onrender.com/',
    'http://localhost:5173',
    'http://localhost:5174'
  ];
  
  const corsOptions = {
    origin: function(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Origin is not allowed by CORS'));
      }
    },
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
  };

//   middleware
    app.use(cors(corsOptions));
    app.use(express.json());
    app.use(passport.initialize());
    app.use(passport.session());

// Define a function to connect to the database
const connectDB = async () => {
    try {
      // Check if the DB_STRING environment variable is defined
      if (!process.env.DB_STRING) {
        throw new Error('DB_STRING environment variable is not defined.');
      }
      await mongoose.connect(process.env.DB_STRING);
      console.log('Connected to MongoDB');
      // Start the server after the database connection is established
      app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
      });
    } catch (err) {
      console.error('Error connecting to MongoDB:', err);
      process.exit(1); // Exit the process if there's an error
    }
  };
// Call the connectDB function to initiate the database connection
    connectDB();


// Global error handler middleware
app.use((err, req, res, next) => {
    console.error('Global error handler:', err);
    res.status(500).json({ error: 'Internal server error' });
  });