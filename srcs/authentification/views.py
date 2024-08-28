from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import CustomUser

@csrf_exempt
def register_user(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        email = request.POST.get('email')
        password = request.POST.get('password')

        # Créer et enregistrer un nouvel utilisateur
        user = CustomUser(username=username, email=email, password=password)
        user.save()

        # Envoyer une réponse JSON de succès
        return JsonResponse({'status': 'success', 'message': 'User registered successfully'})
    else:
        return JsonResponse({'status': 'error', 'message': 'Invalid request method'}, status=400)



def home(request):
    return render(request, 'home.html')

def signin(request):
    return render(request, 'signin.html')

def signup(request):
    return render(request, 'signup.html')

