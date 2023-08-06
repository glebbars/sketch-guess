# Use an official MySQL image as the base image
FROM mysql:8

# already have it in docker compose
# Create a new database and user
#ENV MYSQL_DATABASE=${DATABASE}
#ENV MYSQL_USER=${DATABASE_USER}
#ENV MYSQL_PASSWORD=${DATABASE_PASSWORD}
#ENV MYSQL_ROOT_PASSWORD=${DATABASE_PASSWORD}


# Copy the init_db.sql script to the Docker entrypoint directory
COPY init_db.sql /docker-entrypoint-initdb.d/init_db.sql

# Expose the default MySQL port (3306) if needed
# EXPOSE 3306

# The MySQL container will start automatically using the base image's ENTRYPOINT
