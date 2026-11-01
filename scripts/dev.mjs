import { spawn, spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const apiEnv = new URL('../StarStats-API/.env', import.meta.url);
if (existsSync(apiEnv)) process.loadEnvFile(fileURLToPath(apiEnv));
const php = process.env.PHP_BINARY || 'php';
if (!process.env.npm_execpath) throw new Error('Start this script with npm run dev.');
for (const folder of ['StarStats-API', 'web-app']) {
  if (!existsSync(new URL(`../${folder}/node_modules`, import.meta.url)) || !existsSync(new URL(`../${folder}/.env`, import.meta.url))) {
    console.error('Run npm run setup first, then configure StarStats-API/.env.');
    process.exit(1);
  }
}
const phpCheck = spawnSync(php, ['-r', 'exit(class_exists("DOMDocument") && extension_loaded("openssl") ? 0 : 1);']);
if (phpCheck.status !== 0) {
  console.error('PHP 8 with DOM and OpenSSL is required. Add php to PATH or set PHP_BINARY to php.exe.');
  process.exit(1);
}

const children = [];
let stopping = false;
function stop(code = 0) {
  if (stopping) return;
  stopping = true;
  for (const child of children) {
    if (process.platform === 'win32') spawnSync('taskkill', ['/pid', String(child.pid), '/T', '/F'], { stdio: 'ignore', windowsHide: true });
    else child.kill('SIGTERM');
  }
  process.exit(code);
}
function start(command, args, cwd) {
  const child = spawn(command, args, { cwd, stdio: 'inherit', windowsHide: true });
  children.push(child);
  child.on('error', error => { console.error(error.message); stop(1); });
  child.on('exit', code => { if (!stopping) stop(code ?? 1); });
}
process.on('SIGINT', () => stop());
process.on('SIGTERM', () => stop());
start(php, ['-S', '127.0.0.1:8000', '-t', 'ficheros Scraping/StarStats-SCRAPING'], root);
for (const folder of ['StarStats-API', 'web-app']) {
  start(process.execPath, [process.env.npm_execpath, 'run', 'dev'], fileURLToPath(new URL(`../${folder}/`, import.meta.url)));
}
console.log('StarStats: http://localhost:5173 — Ctrl+C stops the three application services.');
