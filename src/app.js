const express = require('express');
const dotenv = require('dotenv');
const dbConnect = require('./config/dbConnect');
const { errorHandler, notFound } = require('./middlewares/errorMiddleware');
const userRoute = require('./routes/users/userRoute');
const app = express();
dotenv.config();
dbConnect();
app.use(express.json());

app.use('/api/users', userRoute);

app.use(notFound);
app.use(errorHandler);

module.exports = app;

//mongodb+srv://hikikomori377:<password>@cluster0.somdppg.mongodb.net/
