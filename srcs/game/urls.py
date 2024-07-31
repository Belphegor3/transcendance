"""
    La racine des chemins d URL ici est "http://localhost:8000/game/" puisque nous ne sommes pas a la racine ici
"""

from django.contrib import admin
from django.urls import path
from game.views import *    #equivalent a from .views import * parce que meme sous dossier

urlpatterns = [
    path('', index, name="game-index"),
    path('launch/', index, name="game-index"),
]
