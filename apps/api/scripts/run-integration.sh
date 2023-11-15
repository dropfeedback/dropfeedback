#!/usr/bin/env bash
# src/run-integration.sh

# Export env vars
export $(grep -v '^#' .env.test | xargs)

# Run the database
docker-compose up test_db -d
echo '🟡 - Waiting for database to be ready...'

# go to wait-for-it.sh directory and run the script
# Wait for the database to be ready before running the migrations
$(cd "$(dirname "$0")" && pwd)/wait-for-it.sh "${DATABASE_URL}" -- echo '🟢 - Database is ready!'

# Run the migrations
npx prisma migrate reset --force
