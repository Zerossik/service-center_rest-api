const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const { authRouter, contactsRouter, userRouter } = require('./routes/api/');
const { errorHandler } = require('./middleware');
const { isAuthenticated } = require('./middleware');

const app = express();

app.use(
  morgan(':method :url :status :response-time ms :date[web]', {
    stream: fs.createWriteStream(path.resolve('access.log'), { flags: 'a' }),
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use('/api/auth', authRouter);
app.use('/api/contacts', contactsRouter);
app.use('/api/user', isAuthenticated, userRouter);

app.use((req, res) => {
  res.status(404).json({ message: '404 Not Found' });
});

app.use(errorHandler);

module.exports = app;
