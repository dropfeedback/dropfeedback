#!/usr/bin/env bash
# scripts/setenv.sh

# Copy file to current dir and rename it
cp  .env.test .env
# Export env vars
export $(grep -v '^#' .env | xargs)