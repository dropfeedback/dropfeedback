#!/usr/bin/env bash
# src/run-integration.sh

# Get the directory of this script
DIR="$(cd "$(dirname "$0")" && pwd)"

# Export env vars
export $(grep -v '^#' .env.test | xargs)

# Run the database
docker-compose up test_db -d
echo '🟡 - Waiting for database to be ready...'

# Wait for the database to be ready
$DIR/wait-for-it.sh "${DATABASE_URL}" -- echo '🟢 - Database is ready!'

# Run the migrations
npx prisma migrate reset --force
