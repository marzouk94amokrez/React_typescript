const crossEnv = require("cross-env");
const { exec } = require("child_process");

const envFile = process.env.APP_ENV ? `.${process.env.APP_ENV}` : '';
const envPath = `${process.cwd()}/.env${envFile}`;
console.log(`[ENV] - Using: ${envPath}`)
require('dotenv').config({ path: envPath });

process.env.REACT_APP_REVISION = "";
const showRevision = [true, 1, '1', 'on', 'true', 'yes'].includes((process.env.SHOW_REVISION || '').toLowerCase());

if (showRevision) {
  exec("git describe --all --long --first-parent --abbrev", (error, stdout, stderr) => {
    if (error) {
      console.error(`error: ${error.message}`);
      return;
    }

    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }

    const name = stdout.trim().split('/').splice(-1, 1).join() || '';
    const parts = name.split('-');
    parts.splice(-2, 1);

    process.env.REACT_APP_REVISION = parts.join("-");

    crossEnv(process.argv.slice(2));
  });
} else {
  crossEnv(process.argv.slice(2));
}

