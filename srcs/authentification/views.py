from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.

"""
    http://localhost:8000/authentification/
"""
def index(request):
    return HttpResponse("<h1>La connection</h1>")


"""
    http://localhost:8000/authentification/signin/
"""
def signin(request):
    return HttpResponse("<h1>Gerer la connection avec compte 42</h1>")

"""
    http://localhost:8000/authentification/signup/
"""
def signup(request):
    return HttpResponse("<h1>Gerer la creation de compte?</h1>")