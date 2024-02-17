# Makefile

# Docker Compose file location
COMPOSE_FILE = ./docker-compose.yml
COMPOSE_PROD = ./docker-compose.prod.yml

# To start the application for the first time
cold-start:
	docker-compose -f $(COMPOSE_FILE) --profile tools up --build -d

# Build the Docker images
build:
	docker-compose -f $(COMPOSE_FILE) build --no-cache

# Run the Docker containers
up:
	docker-compose -f $(COMPOSE_FILE) up -d

# Access the Docker container
shell:
	docker-compose -f $(COMPOSE_FILE) exec server /bin/bash

# Stop the Docker containers
down:
	docker-compose -f $(COMPOSE_FILE) down

# Rebuild the Docker images and containers
rebuild: down build up

# Prod env
prod:
	docker-compose -f $(COMPOSE_PROD) build --no-cache
	docker-compose -f $(COMPOSE_PROD) up -d