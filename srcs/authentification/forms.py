from django import forms
from django.contrib.auth.models import User

class UserForm(forms.ModelForm):
    """
    Un formulaire dans Django est une classe qui permet de créer et de gérer des formulaires HTML plus facilement.
    Django peut générer automatiquement les champs de formulaire, valider les données soumises, et traiter ces données.

    UserForm(forms.ModelForm) : Cette classe hérite de forms.ModelForm, ce qui signifie que le formulaire est basé sur un modèle Django (ici, le modèle User).

    Meta : La classe Meta est utilisée pour spécifier des options supplémentaires pour le formulaire.
    Ici, on précise que le formulaire est basé sur le modèle User (model = User), et qu'il doit inclure les champs username, email, et password.

    widgets : Les widgets sont des classes qui définissent comment un champ doit être rendu.
    Par exemple, forms.PasswordInput() est un widget qui rend le champ password comme un champ de type password en HTML, ce qui masque l'entrée pour protéger la confidentialité du mot de passe.
    """
    class Meta:
        model = User
        fields = ['username', 'email', 'password']
        widgets = {
            'password': forms.PasswordInput(),
        }
