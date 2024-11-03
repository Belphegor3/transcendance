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
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from rest_framework import status
from rest_framework.views import APIView
from .serializers import UserRegisterSerializer

# Désactiver la protection CSRF pour cette vue
@csrf_exempt
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
@csrf_exempt
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


# Désactiver la protection CSRF pour la vue d'enregistrement utilisateur
@method_decorator(csrf_exempt, name='dispatch')
class RegisterUserView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = UserRegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Utilisateur créé avec succès"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)