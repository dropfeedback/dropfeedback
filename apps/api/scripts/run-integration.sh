#!/usr/bin/env bash
# src/run-integration.sh

# Get the directory of this script
DIR="$(cd "$(dirname "$0")" && pwd)"

# Export env vars
export $(grep -v '^#' .env.test | xargs)

# go to the root of the project
cd ..
# Run the database
docker-compose up test_db -d
echo '🟡 - Waiting for database to be ready...'

# go to current directory
cd $DIR
# Wait for the database to be ready
$DIR/wait-for-it.sh "${DATABASE_URL}" -- echo '🟢 - Database is ready!'

# go to the root of the project
cd ..
# Run the migrations
npx prisma migrate reset --force
