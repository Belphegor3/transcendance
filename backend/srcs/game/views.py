from django.shortcuts import render

# Create your views here.
def game(request):
    return render(request, 'game.html')
def launch(request):
    return render(request, 'pong.html')