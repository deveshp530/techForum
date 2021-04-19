const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

mongoose
  .connect(process.env.DATABASE_CLOUD, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('db connected'))
  .catch((err) => console.error(err));

mongoose.connection.on('error', (err) => {
  console.log(`DB connections error: ${err.me}`);
});

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors({ origin: process.env.CLIENT_URL }));

const authRoute = require('./routes/auth');
const port = process.env.PORT || 8000;

app.use('/api', authRoute);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
