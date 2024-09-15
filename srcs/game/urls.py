from django.urls import path
from . import views

urlpatterns = [
    path('', views.game, name='game'),
    path('custom_versus/', views.custom_versus, name='custom_versus'),
    path('custom_bot/', views.custom_bot, name='custom_bot'),
    path('tournament/', views.tournament, name='tournament'),
    path('launch/', views.launch, name='launch'),
]