from django.db import models

# Create your models here.

class	Player(models.model):
	name = models.CharField(max_length=50);
	id = models.CharField(max_length=50);
	mail = models.CharField(max_length=50);
	js_token = models.CharField(max_length=50);
	password = models.CharField(max_length=50);
	history = models.CharField(max_length=50);