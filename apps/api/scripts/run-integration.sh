#!/usr/bin/env bash
# src/run-integration.sh

# Get the directory of this script
DIR="$(cd "$(dirname "$0")" && pwd)"
echo "$PWD"
# Export env vars
export $(grep -v '^#' .env.test | xargs)

# go to the root of the project
cd ..
echo "$PWD"
# Run the database
docker-compose up test_db -d
echo '🟡 - Waiting for database to be ready...'

# go to current directory
cd $DIR
echo "$PWD"
# Wait for the database to be ready
$DIR/wait-for-it.sh "${DATABASE_URL}" -- echo '🟢 - Database is ready!'

# go to the root of the project
cd ..
echo "$PWD"
# Run the migrations
npx prisma migrate reset --force
