from django.contrib import admin
from .models import Player, GameOptions

admin.site.register(Player)
admin.site.register(GameOptions)
# Register your models here.

from django.contrib import admin
from django.contrib.auth import get_user_model

# Enregistrez vos modèles ici
# from .models import Player  # Si vous avez d'autres modèles à enregistrer

# Création d'un superutilisateur lors du démarrage

# User = get_user_model()
# username = 'root'
# password = '123'  # Changez ceci pour un mot de passe sécurisé
# email = 'root@root.com'  # Changez ceci pour un email valide

# if not User.objects.filter(username=username).exists():
#     User.objects.create_superuser(
#         username=username,
#         email=email,
#         password=password,
#     )
#     print(f'Superuser "{username}" created successfully.')
# else:
#     print(f'Superuser "{username}" already exists.')