all: .env
	docker compose up -d --build

.PHONY:
	all
