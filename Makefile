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

clear-build:
	rm -r apps/**/node_modules
	rm -r apps/**/.turbo
	rm -r apps/**/.next
	rm -r apps/**/dist

	rm -r packages/**/node_modules
	rm -r packages/**/dist
	rm -r packages/**/.turbo
