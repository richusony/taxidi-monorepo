ENV ?= dev

COMPOSE=docker compose
BASE_FILE=compose/docker-compose.yml
ENV_FILE=compose/docker-compose.$(ENV).yml

APP=$(COMPOSE) -f $(BASE_FILE) -f $(ENV_FILE)

.PHONY: up down build logs

up:
	$(APP) up --build -d

down:
	$(APP) down -v

build:
	$(APP) build --no-cache

logs:
	$(APP) logs -f