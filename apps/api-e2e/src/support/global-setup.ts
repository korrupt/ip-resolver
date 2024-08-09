import { spawn } from 'node:child_process';
import path from 'node:path';
import dotenv from 'dotenv';

/* eslint-disable */
var __TEARDOWN_MESSAGE__: string;

module.exports = async function () {
  const env = dotenv.config({ path: path.join(process.cwd(), '.env.test'), override: true });

  console.log('\nSetting up...\n');

  const backend = spawn('docker', ['compose', '-f', 'docker-compose-test.yml', '--env-file=.env.test', 'up'], {
    shell: true,
    stdio: 'pipe',
  });

  await new Promise((resolve) => setTimeout(resolve, 20000));

  // Start the API server
  const server = spawn('node', ['node_modules/.bin/nx', 'serve', 'api'], {
    shell: true,
    stdio:'pipe',
    env: env.parsed,
    cwd: process.cwd(),
  });

  // Store the server process in globalThis so it can be accessed in globalTeardown
  globalThis.__SERVER_PROCESS__ = server;
  // You might want to wait for the server to be fully up before proceeding
  // This is a simplistic approach; consider polling a health endpoint instead
  await new Promise((resolve) => setTimeout(resolve, 5000));

  // Hint: Use `globalThis` to pass variables to global teardown.
  globalThis.__TEARDOWN_MESSAGE__ = '\nTearing down...\n';
};
