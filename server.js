const { connect } = require('mongoose');

require('dotenv').config();
const app = require('./app.js');
const { PORT, DB_URL } = process.env;

connect(DB_URL)
  .then(() => {
    console.log('Database connection successful');
    app.listen(PORT, () =>
      console.log(`Server running. Use our API on port: ${PORT}`)
    );
  })
  .catch(e => {
    console.log(e.message);
    process.exit(1);
  });
