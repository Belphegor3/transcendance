from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),        # Route pour la page d'accueil
    path('signin/', views.signin, name='signin'),  # Route pour la page de connexion
    path('signup/', views.signup, name='signup'),  # Route pour la page d'inscription
]
