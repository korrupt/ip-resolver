#!/bin/bash
set -a
. $(pwd)/.env.test
set +a

# Function to clean up processes on exit
cleanup_backend() {
  echo "Terminating backend processes..."
  kill $docker_pid  # Terminate the Docker process
  wait $docker_pid 2>/dev/null
  echo "Processes terminated."
}

# Trap SIGINT and SIGTERM to trigger cleanup
trap cleanup_backend SIGINT SIGTERM

# Run docker compose and capture PID
docker_compose_output=$(mktemp)
docker compose -f docker-compose-test.yml --env-file=.env.test up > >(tee "$docker_compose_output") 2>&1 &
docker_pid=$!

# During testing a cold start took ~ 17s
sleep 17

# Run nx command in the foreground (without &)
nx run --skipNxCache api:serve

# The script will wait here for the nx process to finish

# Clean up Docker after nx finishes or on Ctrl+C
cleanup_backend

# Clean up after spacebar is pressed (optional, you might not need this anymore)
docker compose -f docker-compose-test.yml down
docker volume rm -f ip-resolver_timescale-test
