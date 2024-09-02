/* eslint-disable */

import { exec } from "node:child_process";
import { promisify } from "node:util";

const execPromise = promisify(exec);

module.exports = async function () {
  // Put clean up logic here (e.g. stopping services, docker-compose, etc.).
  // Hint: `globalThis` is shared between setup and teardown.
  console.log(globalThis.__TEARDOWN_MESSAGE__);

  // Stop the server process initiated in globalSetup
  if (globalThis.__SERVER_PROCESS__) {
    globalThis.__SERVER_PROCESS__.kill();
  }

  await execPromise('docker compose -f docker-compose-test.yml down -t 3');
  await execPromise('docker volume rm -f ip-resolver_timescale-test');

};
