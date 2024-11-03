from django.db import models
from django.contrib.auth.models import AbstractUser
import uuid
from django.conf import settings

class GameOptions(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='game_options')
    player_name = models.CharField(max_length=50, blank=True, null=True, default='Bot')
    bar_size = models.CharField(max_length=50)
    game_points = models.IntegerField()
    ball_size = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.player_name}"

class Player(AbstractUser):
    """
    Modèle utilisateur personnalisé pour étendre le modèle de base avec des informations spécifiques.
    """
    id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True, primary_key=True)
    username = models.CharField(max_length=50, unique=True)
    wins = models.IntegerField(default=0)
    losses = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    firstname = models.CharField(max_length=50)
    lastname = models.CharField(max_length=50)
    email = models.EmailField(unique=True)

    def __str__(self):
        return self.username