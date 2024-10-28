all:
	docker compose up -d --build

clean:
	docker compose down --rmi all

fclean:
	docker compose down --rmi all --volumes
	docker system prune -af

re: fclean all

.PHONY: all re clean fclean 