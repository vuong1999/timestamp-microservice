// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
require('dotenv').config();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
const moment = require('moment');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

let responseObject = {};

app.get('/api', (req, res) => {
  responseObject['unix'] = new Date().getTime();
  responseObject['utc'] = new Date().toUTCString();

  res.json(responseObject);
});

app.get('/api/:time', (req, res) => {
  let input = req.params.time;
  console.log('input', input, parseInt(input));
  if (parseInt(input) < 10000) {
    /* Date String */
    responseObject['unix'] = new Date(input).getTime();
    responseObject['utc'] = new Date(input).toUTCString();
  } else {
    /* Timestamp */
    input = parseInt(input);

    responseObject['unix'] = new Date(input).getTime();
    responseObject['utc'] = new Date(input).toUTCString();
  }

  if (!responseObject['unix'] || !responseObject['utc']) {
    res.json({ error: 'Invalid Date' });
  }

  res.json(responseObject);
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
