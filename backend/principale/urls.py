from django.conf.urls import handler404
from django.urls import path, include
from . import views
from django.contrib import admin

# user admin = admin / pass admin = 123

handler404 = 'principale.views.custom_404'

urlpatterns = [
    path('', views.test, name='test'),
    path('api/', include('handle_api.urls')),
    path('admin/', admin.site.urls),
]
