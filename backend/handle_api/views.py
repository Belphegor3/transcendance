from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import GameOptions
from django.contrib.auth.decorators import login_required
#
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import UserProfile
from .serializers import UserProfileSerializer
from django.contrib.auth.models import User

# @api_view(['POST'])
# @login_required
# def save_game_options(request):
#     data = request.data
#     user = request.user

#     game_options, created = GameOptions.objects.get_or_create(user=user)
#     game_options.player_name = data.get('playerName') or "Bot"
#     game_options.bar_size = data.get('barSize') or "medium"
#     game_options.game_points = data.get('gamePoints') or 5
#     game_options.ball_size = data.get('ballSize') or "small"
#     game_options.save()

#     return Response({'status': 'Options enregistrées avec succès', 'id': game_options.id})

api_view(['POST'])
@login_required
def save_game_options(request):
    data = request.data
    user = request.user

    game_options, created = GameOptions.objects.get_or_create(user=user)

    game_options.player_name = data.get('playerName') or "Bot"
    game_options.bar_size = data.get('barSize') or "medium"
    game_options.game_points = data.get('gamePoints') if 'gamePoints' in data else 5  # Utilisation de 5 comme valeur par défaut
    game_options.ball_size = data.get('ballSize') or "small"
    
    game_options.save()

    return Response({'status': 'Options enregistrées avec succès', 'id': game_options.id})

@api_view(['GET'])
@login_required
def get_latest_game_options(request):
    user = request.user

    try:
        game_options = user.game_options.latest('created_at')
        options = {
            'playerName': game_options.player_name,
            'barSize': game_options.bar_size,
            'gamePoints': game_options.game_points,
            'ballSize': game_options.ball_size,
        }
    except GameOptions.DoesNotExist:
        options = {
            'playerName': 'Bot',
            'barSize': 'medium',
            'gamePoints': 5,
            'ballSize': 'small',
        }

    return Response(options)

# from rest_framework.decorators import api_view
# from rest_framework.response import Response
# from .models import UserProfile
# from .serializers import UserProfileSerializer

@api_view(['POST'])
def create_user_profile(request):
    serializer = UserProfileSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(user=request.user)
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)

user = User.objects.create_user("user", "testmail@mail.fr", "123");