#!/usr/bin/env bash
# src/run-integration.sh

DIR="$(cd "$(dirname "$0")" && pwd)"
source $DIR/setenv.sh

docker-compose up test_db -d
echo '🟡 - Waiting for database to be ready...'
$DIR/wait-for-it.sh "${DATABASE_URL}" -- echo '🟢 - Database is ready!'

npx prisma migrate reset --force
