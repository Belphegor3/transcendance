from django.urls import path
from . import views
from .views import RegisterUserView

urlpatterns = [
    # path('profile/', views.get_profile, name='get_profile'),
    # path('register/', views.register_user, name='register_user'),
    # path('login/', views.login_user, name='login_user'),
    path('game/options/', views.get_latest_game_options, name='get_latest_game_options'),
    path('game/options/save/', views.save_game_options, name='save_game_options'),
    path('register/', RegisterUserView.as_view(), name='register'),
    # path('auth42/', views.auth42, name='auth42'),
    path('updateUser/', views.set_user_info, name='set_user_info'),
    path('getUser/', views.get_user_info, name='get_user_info'),
    path('delete/', views.delete_user_account, name='delete_user_account'),
    # path('game/score/', views.save_game_score, name='save_game_score'),
]
