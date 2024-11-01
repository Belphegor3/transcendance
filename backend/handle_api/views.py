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

# new_user = User.objects.create_user(username='useruser', password='123')

# user_profile = UserProfile.objects.create(
#     user=new_user,
#     # avatar='avatars/default.jpg',
#     display_name='jhonn',
#     wins=0,
#     losses=0,
#     match_history=""
# )


def create_test_user():
    # Données en dur
    data = {
        "username": "testuser",
        "password": "testpassword123",
        "display_name": "TestUserDisplayName",
        # "avatar": "avatars/testuser.jpg"
    }

    # Vérifier si l'utilisateur existe déjà
    if User.objects.filter(username=data['username']).exists():
        print(f"L'utilisateur {data['username']} existe déjà. Aucune création n'a été effectuée.")
        return

    # Créer un nouvel utilisateur
    new_user = User.objects.create_user(
        username=data['username'],
        password=data['password']
    )

    # Associer un profil utilisateur
    UserProfile.objects.create(
        user=new_user,
        avatar=data['avatar'],
        display_name=data['display_name']
    )
    print(f"Utilisateur {new_user.username} et profil créés avec succès.")

    import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from .models import UserProfile

@csrf_exempt  # Pour simplifier le test local, désactiver CSRF pour cette vue
def create_users_from_json(request):
    if request.method == 'POST':
        try:
            # Charger les données JSON de la requête
            users_data = json.loads(request.body)
            created_users = []

            # Boucler sur chaque utilisateur dans le JSON reçu
            for user_data in users_data:
                username = user_data.get('username')
                password = user_data.get('password')
                display_name = user_data.get('display_name')
                avatar = user_data.get('avatar', 'avatars/default.jpg')

                # Vérifier si l'utilisateur existe déjà
                if User.objects.filter(username=username).exists():
                    continue  # Ignorer cet utilisateur s'il existe

                # Créer le nouvel utilisateur et son profil
                new_user = User.objects.create_user(username=username, password=password)
                UserProfile.objects.create(
                    user=new_user,
                    avatar=avatar,
                    display_name=display_name
                )
                created_users.append(username)

            # Répondre avec la liste des utilisateurs créés
            return JsonResponse({"created_users": created_users}, status=201)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON format"}, status=400)

    # Si ce n'est pas une requête POST
    return JsonResponse({"error": "Only POST requests are allowed"}, status=405)
