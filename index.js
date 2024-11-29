import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';


import dbConnect from './config/database.js';

import userRoute from './routes/userRoute.js';
import listRoute from './routes/listRoute.js';



dotenv.config({
  path: '.env'
});

// Connect to the database
dbConnect();

const app = express();

// Middleware
app.use(express.json()); 


const corsOptions = {
  origin: 'http://localhost:3000',  // Frontend origin
  credentials: true, 
};

app.use(cors(corsOptions));


// Routes

app.use('/api/v1/user', userRoute);
app.use('/api/v2/product', listRoute);


// Server listening port
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log("Server is listening on port " + port);
});
