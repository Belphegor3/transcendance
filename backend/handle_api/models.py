from django.db import models
from django.contrib.auth.models import User

class GameOptions(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='game_options')
    player_name = models.CharField(max_length=50, blank=True, null=True, default='Bot')
    bar_size = models.CharField(max_length=50)
    game_points = models.IntegerField()
    ball_size = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username}"

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    avatar = models.ImageField(upload_to='avatars/', default='avatars/default.jpg')
    display_name = models.CharField(max_length=50, unique=True)
    wins = models.IntegerField(default=0)
    losses = models.IntegerField(default=0)
    match_history = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Profile of {self.user.username}"