require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cookieparser = require('cookie-parser');
const cors = require('cors');

const authRouter= require('./routes/auth-routes');


mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log('mongo db connected'))
  .catch((error) => console.log('error'));

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.CLIENT_BASE_URL,
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'Cache-Control',
      'Expires',
      'Pragma',
    ],
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieparser());

app.use('/api/auth', authRouter);

app.listen(PORT, () => console.log(`server is now running on port ${PORT}`));