from django.db import models

class CustomUser(models.Model):
    username = models.CharField(max_length=10)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=10)

    def __str__(self):
        return self.username
