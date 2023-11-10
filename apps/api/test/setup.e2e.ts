import { config } from 'dotenv';

import { PrismaClient } from '@prisma/client';
import { randomUUID } from 'node:crypto';
import { execSync } from 'node:child_process';

config({ path: '.env', override: true }); // load the .env file
config({ path: '.env.test', override: true }); // override: true is used to override the .env file with the .env.test file
const prisma = new PrismaClient();
const schemaId = randomUUID();

function generateUniqueDatabaseURL(schemaId: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not defined.');
  }
  const url = new URL(process.env.DATABASE_URL);
  url.searchParams.set('schema', schemaId);
  return url.toString();
}

beforeAll(async () => {
  const databaseURL = generateUniqueDatabaseURL(randomUUID());
  process.env.DATABASE_URL = databaseURL;
  execSync('pnpm prisma migrate deploy');
});

afterAll(async () => {
  await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schemaId}" CASCADE`);
  await prisma.$disconnect();
});
