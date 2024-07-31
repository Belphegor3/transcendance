from django.shortcuts import render
from django.http import HttpResponse

def index(request):
    # return HttpResponse("<h1>Le profile du joueur</h1>")
    return render(request, "user_profile/index.html")