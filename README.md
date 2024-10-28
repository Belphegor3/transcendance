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
pip install djangorestframework
python3 backend/manage.py makemigrations
python3 backend/manage.py migrate
python3 backend/manage.py collectstatic
python3 backend/manage.py runserver --insecure
```

# faire fonctionner la db:

```bash
sudo -u postgres psql
```
```psql
CREATE ROLE group WITH LOGIN PASSWORD '1234';
ALTER ROLE group CREATEDB;
CREATE DATABASE trans;
GRANT ALL PRIVILEGES ON DATABASE trans TO group;
```

ensuite il faut changer backend/principale/settings.py en remplacant l ancien 'DATABASES':

```
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'trans',
        'USER': 'group',
        'PASSWORD': '1234',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}
```


[HOME](http://localhost:8000/)