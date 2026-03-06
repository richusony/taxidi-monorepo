dev:
	docker compose -f docker/docker-compose.yml -f docker/docker-compose.dev.yml up -d

prod:
	docker compose -f docker/docker-compose.yml -f docker/docker-compose.prod.yml up -d

down-dev:
	docker compose -f docker/docker-compose.yml -f docker/docker-compose.dev.yml down

down-prod:
	docker compose -f docker/docker-compose.yml -f docker/docker-compose.prod.yml down

build:
	docker compose build

logs:
	docker compose logs -f