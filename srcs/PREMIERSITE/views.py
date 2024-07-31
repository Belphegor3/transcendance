#les vues (views) sont une passerelle entre les chemins d url et le html qu on veut renvoyer



from django.http import HttpResponse
from django.shortcuts import render
from datetime import datetime

def index(request):
    date = datetime.today()
    return render(request, "index.html", context={"prenom": "Esclave", "date": date})