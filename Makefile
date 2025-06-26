# Simple Makefile for ATS CRUD Assessment

.PHONY: up build stop clean db-reset

up:
	docker compose up -d

build:
	docker compose build --no-cache

stop:
	docker compose stop

down:
	docker compose down

clean:
	docker compose down
	docker rmi ats-crud-assessment-api ats-crud-assessment-frontend 2>/dev/null || true

clean-all:
	docker compose down -v
	docker rmi ats-crud-assessment-api ats-crud-assessment-frontend 2>/dev/null || true
	
db-reset:
	docker compose down
	docker volume rm ats-crud-assessment_mysql_data 2>/dev/null || true
	docker compose up -d

status:
	docker compose ps

logs:
	docker compose logs -f
