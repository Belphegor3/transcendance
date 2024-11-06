# from rest_framework.decorators import api_view
# from rest_framework.response import Response
# from .models import GameOptions
# from django.contrib.auth.decorators import login_required
# from rest_framework import status
# from rest_framework.views import APIView
# from .serializers import UserRegisterSerializer

# @api_view(['POST'])
# @login_required
# def save_game_options(request):
#     data = request.data

#     GameOptions.player_name = data.get('playerName') or "Bot"
#     GameOptions.bar_size = data.get('barSize') or "medium"
#     GameOptions.game_points = data.get('gamePoints') or 5
#     GameOptions.ball_size = data.get('ballSize') or "small"
#     GameOptions.save()

#     return Response({'status': 'Options enregistrées avec succès', 'id': GameOptions.id})


# @api_view(['GET'])
# @login_required
# def get_latest_game_options(request):
#     user = request.user

#     try:
#         game_options = user.game_options.latest('created_at')
#         options = {
#             'playerName': game_options.player_name,
#             'barSize': game_options.bar_size,
#             'gamePoints': game_options.game_points,
#             'ballSize': game_options.ball_size,
#         }
#     except GameOptions.DoesNotExist:
#         options = {
#             'playerName': 'Bot',
#             'barSize': 'medium',
#             'gamePoints': 5,
#             'ballSize': 'small',
#         }

#     return Response(options)

# class RegisterUserView(APIView):
#     def post(self, request, *args, **kwargs):
#         serializer = UserRegisterSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response({"message": "Utilisateur créé avec succès"}, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import GameOptions
# from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from rest_framework import status
from rest_framework.views import APIView
from .serializers import UserRegisterSerializer
from django.conf import settings
from django.shortcuts import redirect
# from django.contrib.auth import login
from django.contrib.auth.models import User
import os
import requests
from django.http import JsonResponse
import logging, logging.config
import sys

# Désactiver la protection CSRF pour cette vue
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


# Désactiver la protection CSRF pour cette vue
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
        return JsonResponse({'erroooor': str(e)}, status=500)

def get_42_user_data(access_token):
    api_url = 'https://api.intra.42.fr/v2/me'
    headers = {'Authorization': f'Bearer {access_token}'}
    
    response = requests.get(api_url, headers=headers)
    
    if response.status_code != 200:
        raise ValueError('Failed to fetch user data')

    return response.json()

def login_or_create_user(request, user_data):
    username = user_data.get('login')
    first_name = user_data.get('first_name')
    last_name = user_data.get('last_name')
    email = user_data.get('email')
    

    # LOGGING = {
    #     'version': 1,
    #     'handlers': {
    #         'console': {
    #             'class': 'logging.StreamHandler',
    #             'stream': sys.stdout,
    #         }
    #     },
    #     'root': {
    #         'handlers': ['console'],
    #         'level': 'INFO'
    #     }
    # }

    # logging.config.dictConfig(LOGGING)
    # logging.info(f"email: {email} \nlogin: {username}\nfirst_name: {first_name}\nlast_name: {last_name}")
    return redirect("https://localhost:4443/admin")


class RegisterUserView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = UserRegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Utilisateur créé avec succès"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 