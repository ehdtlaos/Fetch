const http = require('http');
const express = require('express');

const port = 3000;
const app = express();

app.use(express.json());

app.use('/', function(req, res) {
  res.send('fetch backend - works');
});

app.listen(port, () => {
  console.log(`server listening at localhost:${port}!`);
});