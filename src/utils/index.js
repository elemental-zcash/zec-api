const { zecwalletArgs } = require('../constants');

const { exec, execFile } = require('child_process');
const { promisify } = require('util');

const execFileAsync = promisify(execFile);

const zecwalletCommand = '/usr/local/bin/zecwallet-cli';

const runZecCommand = async (args) => {
  const { err, stdout, stderr } = await execFileAsync(zecwalletCommand, [].concat(args));
  if (err) {
    throw err;
  }

  return stdout;
};

const syncZecwallet = async () => {
  const syncedStatusStdout = await runZecCommand(zecwalletArgs.syncstatus);

  const syncstatusRes = extractJsonFromStdout(syncedStatusStdout);

  const { sync_id, in_progress, in_prorgess: in_progress_typo_fallback } = syncstatusRes;
  const syncInProgress = in_progress || in_progress_typo_fallback || false;

  if (sync_id === 1 && !syncInProgress) {
    return true;
  }

  return false;
}

const extractJsonFromStdout = (stdout) => {
  let startRecordingJson = false;
  let stdResString = '';

  try {
    const stdoutArray = stdout.split('\n');

    stdoutArray.forEach((line) => {
      if (line.match(/(\w+):\s*([^;]*)/g)) {
        // noop
      }
      if (line.startsWith('{')) {
        startRecordingJson = true;
      }
      if (startRecordingJson) {
        stdResString += line.trim();
      }
    });

    if (stdResString) {
      const stdRes = JSON.parse(stdResString);

      return stdRes;
    } else {
      return null;
    }
    return 
  } catch (err) {
    return null;
  }
}

module.exports = {
  runZecCommand,
  syncZecwallet,
  extractJsonFromStdout,
};
