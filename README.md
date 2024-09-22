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

on a besoin d un '--insecure' pour run le server parce qu on a pas encore de vrai server web qui gere ca donc j arrive pas a afficher les images genre error404 sans le flag

python srcs/manage.py makemigrations
python srcs/manage.py migrate


L'élément <a> est sémantiquement utilisé pour la navigation. Son but est d'indiquer qu'un clic redirigera l'utilisateur vers une autre page ou ressource.  

Un bouton est sémantiquement utilisé pour l'interaction, notamment pour des actions sur la page comme soumettre des données, déclencher des scripts, etc.  
Il est plus approprié d'utiliser <button> pour des actions qui ne sont pas liées à la navigation.

## Liste des liens utilisables et qu il faudra implementer ou pas

**On retrouve tout ca dans 'srcs/PREMIERSITE/urls.py qui est en gros la racine du projet tout passe par la**  

1. [HOME](http://localhost:8000/)
2.  - [Login](http://localhost:8000/signin/)
    - [Creation_de_compte](http://localhost:8000/signup/)


## DOCUMENTATION

| Liens vers les docs |
| - |
| [django](https://docs.djangoproject.com/en/5.0/contents/) |
| [postgresql](https://www.postgresql.org/docs/current/) |
| [bootstrap](https://getbootstrap.com/docs/5.3/getting-started/introduction/) |
| [python](https://docs.python.org/fr/3/#) |
| [JavaScript](https://www.freecodecamp.org/news/the-complete-javascript-handbook-f26b2c71719c/#justjavascript) |
| [map/filter/reduce](https://www.youtube.com/watch?v=r0xv0uZM5V4) |
| [how_to_fetch](https://www.youtube.com/watch?v=C8bKthavr6E) |


## COMMANDES UTILES

- `python3 -m venv .env` permet de creer un environnement virutel dans le dossier .env

- `source .env/bin/activate` pour entrer dans l env virtuel         deactivate pour desactiver l env virtuel pas besoin de source .env/bin/deactivate

- `pip freeze > requirements.txt` pour mettre toutes les versions des bibliotheques qu on utilise

- `pip install -r requirements.txt` pour les installer du coup

- `django-admin startproject nomduprojet` pour creer un nouveau projet

- `python manage.py runserver` (pointe directement sur settings.py donc plus pratique que django-admin qui necessiterait de preciser quel settings.py)   pour lancer le server de developpement

- `python manage.py startapp newapp` pour creer une nouvelle app/section genre pour creer une nouvelle interface  
On va donc devoir ajouter **newapp** dans settings.py dans "INSTALLED_APPS" puis ajouter un nouveau chemin d URL dans "newapp/urls.py" dans "urlpatterns" sans oublier le "urls.py" principal de PREMIERSITE  
Ensuite on doit creer notre nouvelle vue dans "newapp/views.py" et creer un nouveau template dans "newapp/templates/nom/index.html".  

- `python srcs/manage.py makemessages -l fr`  
- `python srcs/manage.py makemessages -l en`  
- `python srcs/manage.py compilemessages`  
**Django n a qu un point d entree pour les URL dans settings.py ROOT_URLCONF**  

## Utilisation PostgreSql  

```bash
sudo -i -u postgres
```  
puis  
```bash
psql
```  

```sql
CREATE DATABASE nom_base_de_donnees;                        # creer DB
DROP DATABASE nom_base_de_donnees;                          # supprimer DB
CREATE TABLE nom_table ();                                  # creer une table
INSERT INTO nom_table (nom, age) VALUES ('Alice', 30);      # inserer des donnees
SELECT * FROM nom_table;                                    # selectionner des donnees
SELECT nom, poste FROM employes;                            # ici seules les colonnes nom et poste sont retournes a chaque ligne de la table
UPDATE nom_table SET age = 31 WHERE nom = 'Alice';          # met a jour
DELETE FROM nom_table WHERE nom = 'Bob';                    # supprimer des donnees
BEGIN;                                                      # commence une transaction (sert a utiliser une liste de commandes)
COMMIT;                                                     # fin de transaction
ROLLBACK;                                                   # sert a annuler les modifications
CREATE USER nom_utilisateur WITH PASSWORD 'mot_de_passe';   # creer un utilisateur
GRANT ALL PRIVILEGES ON DATABASE trans TO postgres;         # donner les droits
```  



installer brew:  
```bash
curl -fsSL https://rawgit.com/kube/42homebrew/master/install.sh | zsh
brew install gettext
```