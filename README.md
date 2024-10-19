## Lancer le project

```bash
# Create Secrets:
cp sample.env .env

# Launch project
make

# Logs:
docker compose logs --follow

# Stop:
docker compose down -v

# Reset docker
docker system prune -af
```

```bash
sudo apt update
sudo apt upgrade
sudo apt install python3 -y
sudo apt update
sudo apt upgrade
sudo apt install python3-pip -y
sudo apt install virtualenv -y
sudo apt-get install postgresql postgresql-contrib -y
sudo apt-get install libpq-dev python3-dev -y
virtualenv .env
source .env/bin/activate
pip install --upgrade pip
pip install django
pip install -r requirements.txt
pip install psycopg2-binary
python3 backend/manage.py makemigrations
python3 backend/manage.py migrate
python3 backend/manage.py collectstatic
python3 backend/manage.py runserver --insecure
```

[HOME](http://localhost:8000/)