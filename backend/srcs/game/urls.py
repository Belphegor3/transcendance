from django.urls import path
from . import views

urlpatterns = [
    path('', views.game, name='game'),
    path('launch/', views.launch, name='launch'),
]