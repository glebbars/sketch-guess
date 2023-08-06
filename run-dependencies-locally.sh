#!/usr/bin/env bash

# prevent printing out to stdout 2> /dev/null || true
# MySQL

declare -r DATABASE_USER=root
declare -r DATABASE_PASSWORD=password

docker build -t mysql_db:latest .
docker run --rm -d --name=sketch_guess_db -p 3306:3306 --env DATABASE_USER=$DATABASE_USER --env MYSQL_ROOT_PASSWORD=$DATABASE_PASSWORD mysql_db:latest
docker exec -i sketch_guess_db mysql -u$DATABASE_USER -p$DATABASE_PASSWORD < create_db.sql

echo "Done!"