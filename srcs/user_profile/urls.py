"""
    La racine des chemins d URL ici est "http://localhost:8000/user_profile/" puisque nous ne sommes pas a la racine ici
    user_profile et non profile parce que profile existe deja en django
"""

from django.contrib import admin
from django.urls import path
from user_profile.views import *    #equivalent a from .views import * parce que meme sous dossier
from . import views

urlpatterns = [
    path('', views.index, name='user_profile'),
]