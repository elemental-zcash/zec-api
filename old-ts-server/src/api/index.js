const { exec } = require('child_process');
const { Router } = require('express');
const { promisify } = require('util');
const { extractJsonFromStdout, runZecCommand, syncZecwallet } = require('../utils');
const { zecwalletArgs } = require('../constants');


const router = Router();


const isDev = true;




const writeError = (res, text) => {
  res.writeHead(500, { 'Content-Type': 'text/html' });

  res.write('<html lang=""><body>\n');
  res.write('<h1>' + text + '<h1>\n');
  res.write('</body></html>');
};

router.get('/echo', (req, res) => {
  const { query } = req;
  const { args } = query;

  if (!args) {
    res.status(500).end();
    return;
  }

  // console.log({ query });

  exec(`echo ${query.args}`, (err, stdout, stderr) => {
    if (err) {
        // fail - return early
        console.log(err);
        res.status(500).end();
        return;
    }

    output = `Full command output: ${stdout}`;

    if (isDev) {
        // console.log(output);
    }

    res.writeHead(200, { 'Content-Type': 'text/html' });

    res.write('<html lang=""><body>\n');
    res.write('<h1>' + output + '<h1>\n');
    res.write('</body></html>');

    res.end();
  });
});


router.get('/list', async (req, res) => {
  const { query } = req;

  try {
    const syncstatusRes = await syncZecwallet();

    if (!syncstatusRes) {
      if (isDev) {
        writeError(res, JSON.stringify({ syncstatusRes }));
      }

      res.end();
      return;
    }

    let zecwalletListStdout;
    try {
      zecwalletListStdout = await runZecCommand(zecwalletArgs.list);
    } catch (err) {
      if (isDev) {
        writeError(res, 'listErr: ' + err);
      }

      res.end();
      return;
    }


    if (/\[(.*?)\]/.test(zecwalletListStdout) && zecwalletListStdout.trim() !== '[]') {
      if (isDev) {
        writeError(res, 'REGEX ERROR: ' + err + ' & ' + zecwalletListStdout);
      }
      res.end();
      return;
    }

    let listRes;

    try {
      ({ list: listRes } = JSON.parse(`{ "list": ${zecwalletListStdout} }`));
    } catch(err) {
      if (isDev) {
        writeError(res, 'listRes error: ' + err + ' & ' + zecwalletListStdout);
      }
      res.end();
      return;
    }

    const output = `Full command output: ${JSON.stringify(listRes)}`;

    res.writeHead(200, { 'Content-Type': 'text/html' });

    res.write('<html lang=""><body>\n');
    res.write('<h1>' + output + '<h1>\n');
    res.write('</body></html>');

    res.end();
  } catch (err) {

    if (isDev) {
      writeError(res, 'error: ' + err);
    }
    res.end();
    // noop
  }
});

module.exports = router;
