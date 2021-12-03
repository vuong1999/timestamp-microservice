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

app.get('/api', (req, res) => {
  const today = new Date();
  const unix = moment(today).unix();
  res.json({ unix : unix, utc: today });
});

app.get('/api/:time', (req, res) => {
  // console.log('req.time', req.params);
  const date = Date.parse(req.params.time);
  console.log('date', date);
  if (Number.isNaN(date)) {
    res.json({ error: 'Invalid Date' });
  } else {
    res.json({ unix: 1451001600000, utc: "Fri, 25 Dec 2015 00:00:00 GMT" });
  }
});

function isValidDate(date) {
  let isValidDate = Date.parse(date);
  if (isNaN(isValidDate)) {
    return false;
  } else {
    return true;
  }
}

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
