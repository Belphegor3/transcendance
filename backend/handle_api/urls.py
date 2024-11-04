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
    path('oauth/redirect/', views.redirect42Oauth, name='redirect_to_42Oauth'),
    path('oauth/callback/', views.callback42Oauth, name='callback_42Oauth'),
    # path('game/score/', views.save_game_score, name='save_game_score'),
]
