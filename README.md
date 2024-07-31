## Lancer le project

**si vous n avez pas encore python3 et/ou pip lancez:**  
```bash
sudo apt install python3 python3-pip
```
  
Sinon ci dessous suffit:  
```bash
virtualenv .env
source .env/bin/activate
pip install django
pip install -r requirements.txt
python3 manage.py runserver
```

## Liste des liens utilisables et qu il faudra implementer ou pas

**On retrouve tout ca dans 'srcs/PREMIERSITE/urls.py qui est en gros la racine du projet tout passe par la**  

1. [HOME](http://localhost:8000/)
2.  - [Accueil Authentification](http://localhost:8000/authentification/)
    - [Login](http://localhost:8000/authentification/signin/)
    - [Creation_de_compte](http://localhost:8000/authentification/signup/)
3. [Profile](http://localhost:8000/user_profile/)
4.  - [Accueil Jeu](http://localhost:8000/game/)
    - [Lancement Jeu](http://localhost:8000/game/launch)

## COMMANDES UTILES

- `python3 -m venv .env` permet de creer un environnement virutel dans le dossier .env

- `source .env/bin/activate` pour entrer dans l env virtuel         deactivate pour desactiver l env virtuel pas besoin de source .env/bin/deactivate

- `pip freeze > requirements.txt` pour mettre toutes les versions des bibliotheques qu on utilise

- `pip install -r requirements.txt` pour les installer du coup

- `django-admin startproject nomduprojet` pour creer un nouveau projet

- `python manage.py runserver` (pointe directement sur settings.py donc plus pratique que django-admin qui necessiterait de preciser quel settings.py)   pour lancer le server de developpement

- `python manage.py startapp newapp` pour creer une nouvelle app/section genre pour creer une nouvelle interface  
On va donc devoir ajouter **newapp** dans settings.py dans "INSTALLED_APPS" puis ajouter un nouveau chemin d URL dans "newapp/urls.py" dans "urlpatterns" sans oublier le "urls.py" principal  
Ensuite on doit creer notre nouvelle vue dans "newapp/views.py" et creer un nouveau template dans "newapp/templates/nom/index.html".  

- `python srcs/manage.py makemessages -l fr`  
- `python srcs/manage.py makemessages -l en`  
- `python srcs/manage.py compilemessages`  
**Django n a qu un point d entree pour les URL dans settings.py ROOT_URLCONF**  


installer brew:  
```bash
curl -fsSL https://rawgit.com/kube/42homebrew/master/install.sh | zsh
brew install gettext
```