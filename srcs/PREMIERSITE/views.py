#les vues (views) sont une passerelle entre les chemins d url et le html qu on veut renvoyer



from django.http import HttpResponse
from django.shortcuts import render
from datetime import datetime
from django.shortcuts import redirect

def index(request):
    date = datetime.today()
    return render(request, "index.html", context={"prenom": "Esclave", "date": date})

def redirect_view_authentification(request):
    return redirect('/authentification/')

def redirect_view_profile(request):
    return redirect('/user_profile/')

def redirect_view_game(request):
    return redirect('/game/')
