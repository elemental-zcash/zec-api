const express = require('express');
const { exec } = require('child_process');
const { URL } = require('url');

const apiRouter = require('./api');
const { syncZecwallet } = require('./utils');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/', (req, res) => {
  res.send('Test');
});

app.use('/api', apiRouter);

app.listen(PORT, HOST, async () => {
  await syncZecwallet();
});

console.log(`Running on http://${HOST}:${PORT}`);
