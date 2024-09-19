SHELL := /bin/zsh

all: setup activate installs
	python3 srcs/manage.py runserver --insecure

noserv: setup activate installs
	@echo "\x1b[1;31mbon ben le makefile fonctionne pas mais tout est installe alors run:\x1b[0m"
	@echo "\x1b[1;5;32m. .env/bin/activate\x1b[0m"

setup:
	sudo apt update -y
	sudo apt upgrade -y
	sudo apt install python3 -y
	sudo apt update -y
	sudo apt upgrade -y
	sudo apt install python3-pip -y
	sudo apt install virtualenv make -y
	sudo apt-get install postgresql postgresql-contrib -y
	sudo apt-get install libpq-dev python3-dev -y
	virtualenv .env

activate:
	. .env/bin/activate
	pip install -r requirements.txt;

installs:
	pip install --upgrade pip
	pip install django
	pip install psycopg2-binary
	python3 srcs/manage.py makemigrations
	python3 srcs/manage.py migrate

.PHONY:
	all noserv setup