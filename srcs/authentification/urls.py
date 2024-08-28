from django.urls import path
from . import views
from .views import register_user

urlpatterns = [
    path('', views.home, name='home'),
    path('signin/', views.signin, name='signin'),
    path('signup/', views.signup, name='signup'),
    path('register/', register_user, name='register_user'),
]
