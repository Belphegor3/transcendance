SHELL := /bin/zsh
COMPOSE := docker-compose
# VOLUMES := ./srcs/nginx/logs

all: up

up: build create
	${COMPOSE} up -d --build

stop down build create:
	${COMPOSE} $@

# create_dir:
#     mkdir -p ${VOLUMES}

clean:
	${COMPOSE} down --rmi all

fclean:
	${COMPOSE} down --rmi all --volumes
	docker system prune -af
	sudo rm -rf ${VOLUMES}

re: fclean all

.PHONY: all up re clean fclean stop down build create
