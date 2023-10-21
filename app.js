const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const { authRouter } = require('./routes/api/');
const { errorHandler } = require('./middleware');
const { homePageController } = require('./controllers');

const app = express();

app.use(
  morgan(':method :url :status :response-time ms :date[web]', {
    stream: fs.createWriteStream(path.resolve('access.log'), { flags: 'a' }),
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.get('/', homePageController);
app.use('/api/auth', authRouter);

app.use((req, res) => {
  res.status(404).json({ message: '404 Not Found' });
});

app.use(errorHandler);

module.exports = app;
