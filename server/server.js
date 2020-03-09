const express = require('express');
const cors = require('cors');
require('es6-promise').polyfill();
require('isomorphic-fetch');

const dotenv = require('dotenv');
dotenv.config();
const frontendOrigin = process.env.FRONTEND_ORIGIN || 'http://localhost:3000';
const key = process.env.UWATERLOO_OPEN_API_KEY || '';

const app = express();
const port = process.env.PORT || 5000;

app.get('/', cors(), (req, res) => {
  res.send('Hello!');
});

const corsOptions = {
  origin: frontendOrigin,
  optionsSuccessStatus: 200,
};

app.get('/course', cors(corsOptions), async (req, res) => {
  const term = req.query.term;
  const subject = req.query.subject;
  const catalogNumber = req.query.catalogNumber;

  if (term && subject && catalogNumber) {
    const uwRes = await fetch(
      `https://api.uwaterloo.ca/v2/courses/${subject}/${catalogNumber}/schedule.json?term=${term}&key=${key}`,
    );
    const uwResJson = await uwRes.json();
    res.json(uwResJson);
    return;
  }
  res.send('Did not specify all of term, subject, catalogNumber');
});

app.listen(port, () => console.log(`App listening on port ${port}!`));
