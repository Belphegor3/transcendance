from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import GameOptions
from django.contrib.auth.decorators import login_required

@api_view(['POST'])
@login_required
def save_game_options(request):
    data = request.data
    user = request.user

    game_options.player_name = data.get('playerName') or "Bot"
    game_options.bar_size = data.get('barSize') or "medium"
    game_options.game_points = data.get('gamePoints') or 5
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
