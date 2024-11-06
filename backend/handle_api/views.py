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

# @method_decorator(csrf_exempt, name='dispatch')
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
        serializer= UserRegisterSerializer(data=request.data)
        if serializer.validate_username(username):
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
