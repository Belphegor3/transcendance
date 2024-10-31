from django.urls import path
from . import views

urlpatterns = [
    # path('profile/', views.get_profile, name='get_profile'),
    # path('register/', views.register_user, name='register_user'),
    # path('login/', views.login_user, name='login_user'),
    path('game/options/', views.get_latest_game_options, name='get_latest_game_options'),
    path('game/options/save/', views.save_game_options, name='save_game_options'),
    path('api/user_profile/', views.create_user_profile, name='create_user_profile'),
]
