from django.urls import path
from . import views

urlpatterns = [
    path('', views.game, name='game'),
    path('launch/', views.launch, name='launch'),
    path('custom_tournament/', views.custom_tournament, name='custom_tournament'),
    path('custom_vs/', views.custom_vs, name='custom_vs'),
    path('tournament/', views.tournament, name='tournament'),
]