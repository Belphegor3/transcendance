from django.shortcuts import render

def game(request):
    return render(request, 'game.html')
def launch(request):
    return render(request, 'pong.html')

def custom_tournament(request):
    return render(request, 'custom_tournament.html')

def custom_vs(request):
    return render(request, 'custom_vs.html')

def tournament(request):
    return render(request, 'tournament.html')