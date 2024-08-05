from django.shortcuts import render
from django.http import HttpResponse
from django.shortcuts import redirect

# Create your views here.

"""
    http://localhost:8000/authentification/
"""
def index(request):
    # return HttpResponse("<h1>La connection</h1>")
    return render(request, "auth.html")

def signin_view(request):
    return render(request, 'signin.html')

def signup_view(request):
    return render(request, 'signup.html')

def redirect_view_signin(request):
    return redirect('/signin/')

def redirect_view_signup(request):
    return redirect('/signup/')