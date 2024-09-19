import sys
import os

# Modifier l'adresse de bind pour qu'elle écoute sur toutes les interfaces
# bind = "0.0.0.0:8000"

#Seulement localhost
bind = "127.0.0.1:8000"

workers = 3
wsgi_app = "srcs.principale.wsgi:application"

