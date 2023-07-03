const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const dbConnect = require('./config/dbConnect');
const { errorHandler, notFound } = require('./middlewares/errorMiddleware');
const userRoute = require('./routes/users/userRoute');
const incomeRoute = require('./routes/income/incomeRoute');
const expenseRoute = require('./routes/income/expenseRoute');
const app = express();
dotenv.config();
dbConnect();
app.use(express.json());
app.use(cors());
app.get('/', (req, res) => {
  res.json({ msg: 'Welcome To Expense Tracker API' });
});
app.use('/api/users', userRoute);

app.use('/api/income', incomeRoute);

app.use('/api/expenses', expenseRoute);
app.use(notFound);
app.use(errorHandler);

module.exports = app;

//mongodb+srv://hikikomori377:<password>@cluster0.somdppg.mongodb.net/
