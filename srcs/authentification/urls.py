"""
    La racine des chemins d URL ici est "http://localhost:8000/authentification/" puisque nous ne sommes pas a la racine ici
"""

from django.contrib import admin
from django.urls import path
from authentification.views import *    #equivalent a from .views import * parce que meme sous dossier
from . import views

urlpatterns = [
    path('', index, name="authentification"),
    path('signin/', views.signin_view, name='signin'),
    path('signup/', views.signup_view, name='signup'),
    path('redirect-signin/', views.redirect_view_signin, name='redirect_signin'),
    path('redirect-signup/', views.redirect_view_signup, name='redirect_signup'),

]