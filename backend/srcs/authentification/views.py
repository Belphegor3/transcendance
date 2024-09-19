from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import CustomUser
from .forms import UserForm
from django.contrib.auth import login

def register_user(request):
    """
    is_valid est une methode Django qui verifie la validite des champs (genre unique=True ou max_lenght=10)
    save est une methode qui enregistre auto les donnees du formulaire dans le DB en creant un nouvel objet 'User'
    """
    if request.method == 'POST':
        form = UserForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('realhome')
    else:
        form = UserForm()

    return render(request, 'authentification/register.html', {'form': form})

def home(request):
    return render(request, 'home.html')

def signin(request):
    return render(request, 'signin.html')


def signup(request):
    if request.method == 'POST':
        form = UserForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect('realhome')  # Remplacez 'realhome' par le nom de votre vue pour l'accueil
    else:
        form = UserForm()

    return render(request, 'signup.html', {'form': form})


