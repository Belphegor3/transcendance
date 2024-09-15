from django.shortcuts import render

# Create your views here.
def game(request):
    return render(request, 'game.html')

def custom_versus(request):
    return render(request, 'custom_versus.html')

def custom_bot(request):
    return render(request, 'custom_bot.html')

def tournament(request):
    return render(request, 'tournament.html')

def launch(request):
    return render(request, 'launch.html')