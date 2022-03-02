const http = require('http');
const express = require('express');
const router = require('./routes');

const port = 3000;
const app = express();

app.use(express.json());
app.use('/', router);

//default URL to API
app.use('/', function(req, res) {
  res.send('Back-end works!');
})

app.listen(port, () => {
  console.log(`server listening at localhost:${port}!`);
});