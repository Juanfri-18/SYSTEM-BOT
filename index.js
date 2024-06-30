console.log('𝐈𝐍𝐒𝐓𝐀𝐋𝐀𝐍𝐃𝐎 𝐒𝐘𝐒𝐓𝐄𝐌 𝐁𝐎𝐓...');
import {join, dirname} from 'path';
import {createRequire} from 'module';
import {fileURLToPath} from 'url';
import {setupMaster, fork} from 'cluster';
import {watchFile, unwatchFile} from 'fs';
import cfonts from 'cfonts';
import {createInterface} from 'readline';
import yargs from 'yargs';
const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(__dirname);
const {name, author} = require(join(__dirname, './package.json'));
const {say} = cfonts;
const rl = createInterface(process.stdin, process.stdout);

say('𝐒𝐘𝐒𝐓𝐄𝐌\n𝐁𝐎𝐓', {
  font: 'block',
  align: 'center',
  gradient: ['blue', 'blue']});
say(`𝐄𝐒𝐏𝐄𝐑𝐎 𝐃𝐈𝐒𝐅𝐑𝐔𝐓𝐄𝐒 𝐃𝐄 𝐒𝐘𝐒𝐓𝐄𝐌 𝐁𝐎𝐓 𝐘 𝐍𝐎 𝐓𝐄 𝐎𝐋𝐕𝐈𝐃𝐄𝐒 𝐃𝐄 𝐀𝐆𝐑𝐀𝐃𝐄𝐂𝐄𝐑𝐋𝐄 𝐀 𝐌𝐈 𝐂𝐑𝐄𝐀𝐃𝐎𝐑 𝐁𝐄𝐍𝐉𝐀𝐌𝐈𝐍 +𝟓𝟏 𝟗𝟑𝟔𝟕𝟑𝟐𝟕𝟐𝟑`, {
  font: 'console',
  align: 'center',
  gradient: ['blue', 'blue']});

let isRunning = false;
/**
* Start a js file
* @param {String} file `path/to/file`
*/
function start(file) {
  if (isRunning) return;
  isRunning = true;
  const args = [join(__dirname, file), ...process.argv.slice(2)];

  say('𝐀𝐉𝐔𝐒𝐓𝐀 𝐋𝐀 𝐏𝐀𝐍𝐓𝐀𝐋𝐋𝐀 𝐏𝐀𝐑𝐀 𝐐𝐔𝐄 𝐏𝐔𝐄𝐃𝐀𝐒 𝐄𝐒𝐂𝐀𝐍𝐄𝐀𝐑 𝐄𝐋 𝐂𝐎𝐃𝐈𝐆𝐎 𝐐𝐑 𝐂𝐎𝐍 𝐄𝐗𝐈𝐓𝐎', {
    font: 'console',
    align: 'center',
    gradient: ['red', 'magenta']});

  setupMaster({
    exec: args[0],
    args: args.slice(1)});
  const p = fork();
  p.on('message', (data) => {
    console.log('[RECEIVED]', data);
    switch (data) {
      case 'reset':
        p.process.kill();
        isRunning = false;
        start.apply(this, arguments);
        break;
      case 'uptime':
        p.send(process.uptime());
        break;
    }
  });
  p.on('exit', (_, code) => {
    isRunning = false;
    console.error('❎ㅤOcurrio un error inesperado:', code);

    p.process.kill();
    isRunning = false;
    start.apply(this, arguments);

    if (process.env.pm_id) {
      process.exit(1);
    } else {
      process.exit();
    }
  });
  const opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse());
  if (!opts['test']) {
    if (!rl.listenerCount()) {
      rl.on('line', (line) => {
        p.emit('message', line.trim());
      });
    }
  }
}
start('main.js');
