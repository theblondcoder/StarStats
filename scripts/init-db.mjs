import { createRequire } from 'node:module';
import { readFileSync } from 'node:fs';

const require = createRequire(new URL('../StarStats-API/package.json', import.meta.url));
require('dotenv').config({ path: new URL('../StarStats-API/.env', import.meta.url) });
const { createConnection } = require('mysql2/promise');
const database = process.env.DB_NAME || 'star_stats';
if (!/^[a-zA-Z0-9_]+$/.test(database)) throw new Error('DB_NAME must contain only letters, numbers and underscores.');

const connection = await createConnection({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  multipleStatements: true,
});
try {
  const [tables] = await connection.query('SELECT TABLE_NAME FROM information_schema.TABLES WHERE TABLE_SCHEMA = ?', [database]);
  if (tables.length) {
    console.log(`Database ${database} already contains tables; nothing was overwritten.`);
  } else {
    const schema = readFileSync(new URL('../database/schema.sql', import.meta.url), 'utf8');
    await connection.query(schema.replaceAll('`star_stats`', `\`${database}\``));
    console.log(`Database ${database} created with the original demo data.`);
  }
} finally {
  await connection.end();
}
