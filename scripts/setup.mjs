import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { randomBytes } from 'node:crypto';

for (const folder of ['StarStats-API', 'web-app']) {
  const destination = new URL(`../${folder}/.env`, import.meta.url);
  if (!existsSync(destination)) {
    const example = readFileSync(new URL(`../${folder}/.env.example`, import.meta.url), 'utf8');
    writeFileSync(destination, example.replace('replace-with-a-secure-random-value', randomBytes(32).toString('hex')));
    console.log(`Created ${folder}/.env`);
  } else {
    console.log(`Keeping existing ${folder}/.env`);
  }
}
