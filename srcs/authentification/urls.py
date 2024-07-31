"""
    La racine des chemins d URL ici est "http://localhost:8000/authentification/" puisque nous ne sommes pas a la racine ici
"""

from django.contrib import admin
from django.urls import path
from authentification.views import *    #equivalent a from .views import * parce que meme sous dossier

urlpatterns = [
    path('', index, name="auth-index"),
    path('signin/', signin, name="auth-signin"),
    path('signup/', signup, name="auth-signup"),
]