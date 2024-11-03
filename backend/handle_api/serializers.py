# from rest_framework import serializers
# from .models import Player

# class UserRegisterSerializer(serializers.ModelSerializer):
#     password = serializers.CharField(write_only=True)

#     class Meta:
#         model = Player
#         fields = ('username', 'email', 'first_name', 'last_name', 'password')

#     def create(self, validated_data):
#         user = Player(
#             username=validated_data['username'],
#             email=validated_data['email'],
#             first_name=validated_data['first_name'],
#             last_name=validated_data['last_name'],
#         )
#         user.set_password(validated_data['password'])
#         user.save()
#         return user

from rest_framework import serializers
from .models import Player

class UserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = Player
        fields = ('username', 'email', 'firstname', 'lastname', 'password')

    def create(self, validated_data):
        user = Player(
            username=validated_data['username'],
            email=validated_data['email'],
            firstname=validated_data['firstname'],
            lastname=validated_data['lastname'],
        )
        user.set_password(validated_data['password'])
        user.save()
        return user