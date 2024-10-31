from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth.models import User
from .models import UserProfile, GameOptions

# class APITests(APITestCase):
#     def setUp(self):
#         # Création d'un utilisateur pour les tests
#         self.user = User.objects.create_user(username='testuser', password='testpassword')
#         self.client.login(username='testuser', password='testpassword')
    
#     def test_create_user_profile(self):
#         url = reverse('create_user_profile')
#         data = {
#             "display_name": "Player123",
#             "wins": 10,
#             "losses": 3
#         }
        
#         # Envoi de la requête POST
#         response = self.client.post(url, data, format='json')
        
#         # Vérification du statut et des données
#         self.assertEqual(response.status_code, status.HTTP_201_CREATED)
#         self.assertEqual(UserProfile.objects.count(), 1)
#         self.assertEqual(UserProfile.objects.get().display_name, "Player123")
    
#     def test_save_game_options(self):
#         url = reverse('save_game_options')
#         data = {
#             "playerName": "BotTest",
#             "barSize": "large",
#             "gamePoints": 7,
#             "ballSize": "medium"
#         }
        
#         # Envoi de la requête POST
#         response = self.client.post(url, data, format='json')
        
#         # Vérification du statut et des données
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         self.assertEqual(GameOptions.objects.count(), 1)
#         self.assertEqual(GameOptions.objects.get().player_name, "BotTest")

# Create your tests here.
from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth.models import User
from handle_api.models import UserProfile  # Assurez-vous d'importer votre modèle

class APITests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpass')
        self.client.login(username='testuser', password='testpass')  # Authentification de l'utilisateur

    def test_create_user_profile(self):
        url = '/api/user_profile/'  # Mettez à jour avec votre URL réelle
        data = {
            'field1': 'value1',  # Remplacez avec les champs requis par votre sérialiseur
            'field2': 'value2',
            'user': self.user.id,  # Assurez-vous que l'utilisateur est lié au profil
        }

        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)