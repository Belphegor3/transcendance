from django.db import models
# from django.contrib.auth.models import AbstractUser

# class User(AbstractUser):
#     pass

class CustomUser(models.Model):
    """
    Un modèle dans Django est une classe Python qui définit la structure de la table dans votre base de données.
    Chaque modèle correspond à une table de la base de données, et chaque attribut du modèle correspond à une colonne de cette table.



    Une table dans une base de données est une structure qui stocke des données de manière organisée.
    Elle est composée de lignes (ou enregistrements) et de colonnes (ou champs).
    Chaque table est conçue pour stocker des informations sur un sujet particulier,
    par exemple, des utilisateurs, des produits, des commandes, etc.
    """


    username = models.CharField(max_length=10)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=10)

    def __str__(self):
        return self.username
