#!/bin/bash
# Attendre que la base de données soit prête
# until psql -h db_host -U db_user -c '\l'; do
#   >&2 echo "Postgres est indisponible - en attente"
#   sleep 1
# done

python3 manage.py collectstatic --noinput
python3 manage.py makemigrations --noinput
python3 manage.py migrate --noinput
python3 manage.py runserver 0.0.0.0:8000 --insecure
