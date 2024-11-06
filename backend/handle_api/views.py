from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import GameOptions
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from rest_framework import status
from rest_framework.views import APIView
from django.contrib.auth.models import User
from .serializers import UserRegisterSerializer
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from django.contrib.auth.hashers import check_password
from .models import Player
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
import os
import requests
from django.http import JsonResponse
import logging, logging.config
import sys
from django.shortcuts import redirect
from django.http import JsonResponse, HttpResponse
from django.shortcuts import redirect
from django.contrib.auth import login

@api_view(['POST'])
def save_game_options(request):
    data = request.data

    # Créez une nouvelle instance de GameOptions
    game_options = GameOptions(
        player_name=data.get('playerName', 'Bot'),
        bar_size=data.get('barSize', 'medium'),
        game_points=data.get('gamePoints', 5),
        ball_size=data.get('ballSize', 'small'),
    )
    game_options.save()

    return Response({'status': 'Options enregistrées avec succès', 'id': game_options.id})


@api_view(['GET'])
def get_latest_game_options(request):
    user = request.user

    try:
        # Filtrer les options de jeu liées à l'utilisateur
        game_options = GameOptions.objects.filter(user=user).latest('created_at')
        options = {
            'playerName': game_options.player_name,
            'barSize': game_options.bar_size,
            'gamePoints': game_options.game_points,
            'ballSize': game_options.ball_size,
        }
    except GameOptions.DoesNotExist:
        # Valeurs par défaut si aucune option n'existe
        options = {
            'playerName': 'Bot',
            'barSize': 'medium',
            'gamePoints': 5,
            'ballSize': 'small',
        }

    return Response(options)

class RegisterUserView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = UserRegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Utilisateur créé avec succès"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@method_decorator(csrf_exempt, name='dispatch')
class EditUserView(APIView):
    def post(self, request, *args, **kwargs):
        email = request.data.get("email")
        firstname = request.data.get("firstname")
        username = request.data.get("username")
        lastname = request.data.get("lastname")
        # user = Player.objects.get(email=email)
        try:
            user = Player.objects.get(email=email)
        except Player.DoesNotExist:
            return Response({"error": "lilian a tord "}, status=status.HTTP_404_NOT_FOUND)
        user.lastname = lastname
        user.firstname = firstname
        user.username = username
        user.save()
        return Response({
            "message": "Utilisateur authentifié avec succès",
            "user": {
                "username": user.username,
                "email": user.email,
                "firstname": user.firstname,
                "lastname": user.lastname,
            }
        }, status=status.HTTP_200_OK)
    
class LoginUserView(APIView):
    def post(self, request, *args, **kwargs):
        email = request.data.get("email")
        password = request.data.get("password")

        if not email or not password:
            return Response({"error": "Email et mot de passe requis"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = Player.objects.get(email=email)
            
            if check_password(password, user.password):
                return Response({
                    "message": "Utilisateur authentifié avec succès",
                    "user": {
                        "username": user.username,
                        "email": user.email,
                        "firstname": user.firstname,
                        "lastname": user.lastname,
                    }
                }, status=status.HTTP_200_OK)
            else:
                return Response({"error": "Mot de passe incorrect"}, status=status.HTTP_401_UNAUTHORIZED)

        except Player.DoesNotExist:
            return Response({"error": "Utilisateur non trouvé"}, status=status.HTTP_404_NOT_FOUND)

class DeleteUserView(APIView):
    # permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        # Supprime l'utilisateur actuellement connecté
        email = request.data.get("email")
        user = Player.objects.get(email=email)
        user.delete()
        
        return Response({
            "message": "Utilisateur authentifié avec succès",
            "user": {
                "username": "",
                "email": "",
                "firstname": "",
                "lastname": "",
            }
        }, status=status.HTTP_200_OK)
    
class ObtainAuthToken(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        
        user = authenticate(username=username, password=password)
        # if user is not None:
        token, created = Token.objects.get_or_create(user=user)
        return Response({'token': token.key}, status=status.HTTP_200_OK)
        # return Response({'error': 'Identifiants invalides'}, status=status.HTTP_400_BAD_REQUEST)

def redirect42Oauth(request):
    client_id = os.getenv('CLIENT_ID')
    redirect_uri = os.getenv('REDIRECT_URI')
    oauth_url = (
        "https://api.intra.42.fr/oauth/authorize?"
        f"client_id={client_id}&"
        f"redirect_uri={redirect_uri}&"
        "response_type=code"
    )
    return redirect(oauth_url)

# def callback42Oauth(request):
#     # Récupérer le code d'autorisation de la requête
#     code = request.GET.get('code')
#     if not code:
#         return JsonResponse({'error': 'Code not provided'}, status=400)

#     token_url = 'https://api.intra.42.fr/oauth/token'
    
#     # Données pour obtenir le token d'accès
#     token_data = {
#         'grant_type': 'authorization_code',
#         'code': code,
#         'client_id': os.getenv('CLIENT_ID'),
#         'client_secret': os.getenv('CLIENT_SECRET'),
#         'redirect_uri': os.getenv('REDIRECT_URI')
#     }
#     # Envoyer une requête POST pour obtenir le token d'accès
#     try:
#         token_response = requests.post(token_url, data=token_data)
#         token_response.raise_for_status()  # Lève une erreur pour les codes d'erreur HTTP
        
#         token_json = token_response.json()
#         access_token = token_json.get('access_token')
        
#         if not access_token:
#             return JsonResponse({'error': 'Access token not found'}, status=400)

#         # Récupérer les informations utilisateur
#         user_data = get_42_user_data(access_token)

#         # Traiter les informations pour créer ou connecter l'utilisateur
#         return login_or_create_user(request, user_data)
        
#     except requests.exceptions.RequestException as e:
#         return JsonResponse({'erroooor': str(e)}, status=500)

def callback42Oauth(request):
    # Récupérer le code d'autorisation de la requête
    code = request.GET.get('code')
    if not code:
        return JsonResponse({'error': 'Code not provided'}, status=400)

    token_url = 'https://api.intra.42.fr/oauth/token'
    
    # Données pour obtenir le token d'accès
    token_data = {
        'grant_type': 'authorization_code',
        'code': code,
        'client_id': os.getenv('CLIENT_ID'),
        'client_secret': os.getenv('CLIENT_SECRET'),
        'redirect_uri': os.getenv('REDIRECT_URI')
    }
    # Envoyer une requête POST pour obtenir le token d'accès
    try:
        token_response = requests.post(token_url, data=token_data)
        token_response.raise_for_status()  # Lève une erreur pour les codes d'erreur HTTP
        
        token_json = token_response.json()
        access_token = token_json.get('access_token')
        
        if not access_token:
            return JsonResponse({'error': 'Access token not found'}, status=400)

        # Récupérer les informations utilisateur
        user_data = get_42_user_data(access_token)

        # Traiter les informations pour créer ou connecter l'utilisateur
        return login_or_create_user(request, user_data)
        
    except requests.exceptions.RequestException as e:
        return JsonResponse({'error': str(e)}, status=500)

    

def get_42_user_data(access_token):
    api_url = 'https://api.intra.42.fr/v2/me'
    headers = {'Authorization': f'Bearer {access_token}'}
    
    response = requests.get(api_url, headers=headers)
    
    if response.status_code != 200:
        raise ValueError('Failed to fetch user data')

    return response.json()

# def login_or_create_user(request, user_data):
#     username = user_data.get('login')
#     first_name = user_data.get('first_name')
#     last_name = user_data.get('last_name')
#     email = user_data.get('email')
#     return redirect("https://localhost:4443/?from=42")

# def login_or_create_user(request, user_data):
#     # Extraire les données nécessaires de user_data
#     data = {
#         "username": user_data.get('login'),
#         "firstname": user_data.get('first_name'),
#         "lastname": user_data.get('last_name'),
#         "email": user_data.get('email'),
#         "password": 'defaultpassword'
#     }

#     # Initialiser le serializer avec les données utilisateur
#     serializer = UserRegisterSerializer(data=data)
    
#     # Vérifier si les données sont valides
#     if serializer.is_valid():
#         # Sauvegarder l'utilisateur si tout est valide
#         serializer.save()
#         return redirect("https://localhost:4443/?from=42")
#     return JsonResponse({'error': 'User hasn\'t been created noob'}, status=400)


def login_or_create_user(request, user_data):
    # Extraire les données nécessaires de user_data
    data = {
        "username": user_data.get('login'),
        "firstname": user_data.get('first_name'),
        "lastname": user_data.get('last_name'),
        "email": user_data.get('email'),
        "password": 'defaultpassword'
    }

    # Initialiser le serializer avec les données utilisateur
    if Player.objects.filter(email=user_data.get('email')).exists():
        response = redirect("https://localhost:4443/?from=42")
        response.set_cookie(
            'user_email',                # Nom du cookie
            user_data.get('email'),      # Valeur du cookie (ici, l'email de l'utilisateur)
            max_age=3600,                # Durée de vie en secondes (ici, 1 heure)
            httponly=True,               # Empêche l'accès en JavaScript (plus sécurisé)
            secure=True                  # Envoie le cookie uniquement en HTTPS
        )
        
        response.set_cookie(
            'user_lastname',             # Nom du cookie pour le nom de famille
            user_data.get('last_name'),  # Valeur du cookie
            max_age=3600,
            httponly=True,
            secure=True
        )
        
        response.set_cookie(
            'user_firstname',            # Nom du cookie pour le prénom
            user_data.get('first_name'), # Valeur du cookie
            max_age=3600,
            httponly=True,
            secure=True
        )
        
        response.set_cookie(
            'user_username',             # Nom du cookie pour le nom d'utilisateur
            user_data.get('login'),      # Valeur du cookie
            max_age=3600,
            httponly=True,
            secure=True
        )
        return response
    else:
        serializer = UserRegisterSerializer(data=data)
        
        # Vérifier si les données sont valides
        if serializer.is_valid():
            # Sauvegarder l'utilisateur si tout est valide
            user = serializer.save()

            # Connecter l'utilisateur pour initialiser la session
            login(request, user)

            # Créer une réponse de redirection avec un cookie contenant l'email
            response = redirect("https://localhost:4443/?from=42")
            
            # Ajouter un cookie pour stocker l'email de l'utilisateur (modifiable selon vos besoins)
            response.set_cookie(
                'user_email',                # Nom du cookie
                user_data.get('email'),      # Valeur du cookie (ici, l'email de l'utilisateur)
                max_age=3600,                # Durée de vie en secondes (ici, 1 heure)
                httponly=True,               # Empêche l'accès en JavaScript (plus sécurisé)
                secure=True                  # Envoie le cookie uniquement en HTTPS
            )
            
            response.set_cookie(
                'user_lastname',             # Nom du cookie pour le nom de famille
                user_data.get('last_name'),  # Valeur du cookie
                max_age=3600,
                httponly=True,
                secure=True
            )
            
            response.set_cookie(
                'user_firstname',            # Nom du cookie pour le prénom
                user_data.get('first_name'), # Valeur du cookie
                max_age=3600,
                httponly=True,
                secure=True
            )
            
            response.set_cookie(
                'user_username',             # Nom du cookie pour le nom d'utilisateur
                user_data.get('login'),      # Valeur du cookie
                max_age=3600,
                httponly=True,
                secure=True
            )
            return response

class GetUserInfo(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = request.user
        serializer = UserRegisterSerializer(user)
        return Response(serializer.data, status=200)
    

