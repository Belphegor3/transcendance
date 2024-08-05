"""PREMIERSITE URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('game/', include('game.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from .views import *    #equivalent a from .views import * parce que meme sous dossier
from django.conf.urls.i18n import set_language
from django.conf.urls.static import static
from django.conf import settings
from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', index, name="index"),
    path('game/', include("game.urls")),
    path('user_profile/', include("user_profile.urls")),
    path('authentification/', include("authentification.urls")),
    path('set_language/', set_language, name='set_language'),
    path('redirect-game/', views.redirect_view_game, name='redirect_game'),
    path('redirec-profile/', views.redirect_view_profile, name='redirect_profile'),
    path('redirect-authentification/', views.redirect_view_authentification, name='redirect_authentification'),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
