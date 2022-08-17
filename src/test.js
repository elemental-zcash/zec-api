const { extractJsonFromStdout } = require('./utils');


const stdout = `{
  "sync_id": 1,
  "in_progress": false,
  "last_error": null
}`;

const stdout2 = `id: 1, blocks: 0%, decryptions: 0%, tx_scan: 0%
id: 1, blocks: 100%, decryptions: 0%, tx_scan: 0%
id: 1, blocks: 100%, decryptions: 0%, tx_scan: 0%
id: 1, blocks: 100%, decryptions: 0%, tx_scan: 0%
id: 1, blocks: 100%, decryptions: 0%, tx_scan: 0%
id: 1, blocks: 100%, decryptions: 0%, tx_scan: 0%
id: 1, blocks: 100%, decryptions: 0%, tx_scan: 0%
id: 1, blocks: 100%, decryptions: 0%, tx_scan: 0%
id: 1, blocks: 100%, decryptions: 0%, tx_scan: 0%
id: 1, blocks: 100%, decryptions: 0%, tx_scan: 0%
id: 1, blocks: 100%, decryptions: 0%, tx_scan: 0%
{
    "sync_id": 1,
  "in_prorgess": false,
  "last_error": null
}`;


console.log(123);

console.log(extractJsonFromStdout(stdout));
console.log(extractJsonFromStdout(stdout2));
