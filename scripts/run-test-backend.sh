#!/bin/bash
set -a
. $(pwd)/.env.test
set +a


# Function to clean up processes on exit
cleanup() {
  echo "Terminating processes..."
  kill $docker_pid $nx_pid
  wait $docker_pid 2>/dev/null
  wait $nx_pid 2>/dev/null
  echo "Processes terminated."
}

# Run docker compose and capture PID
docker_compose_output=$(mktemp)
docker compose -f docker-compose-test.yml --env-file=.env.test up > >(tee "$docker_compose_output") 2>&1 &
docker_pid=$!

# During testing a cold start took ~ 17s
sleep 17

# Run nx command and capture PID
nx_output=$(mktemp)
nx run --skipNxCache api:serve > >(tee "$nx_output") 2>&1 &
nx_pid=$!

# Wait for both processes to start
sleep 4

# Output PIDs
echo "Docker Compose PID: $docker_pid"
echo "NX Serve PID: $nx_pid"

# Trap EXIT signal to ensure cleanup
trap cleanup EXIT

# Wait for spacebar input
echo "Press spacebar to shutdown"
while true; do
  IFS= read -r -n1 -s key
  if [[ $key == ' ' ]]; then
    break
  fi
done

echo "Clearing timescale data"

cleanup

# Clean up after spacebar is pressed
docker compose -f docker-compose-test.yml down
docker volume rm -f ip-resolver_timescale-test
