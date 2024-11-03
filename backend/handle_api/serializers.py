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

# from rest_framework import serializers
# from .models import Player

# class UserRegisterSerializer(serializers.ModelSerializer):
#     password = serializers.CharField(write_only=True)

#     class Meta:
#         model = Player
#         fields = ('username', 'email', 'firstname', 'lastname', 'password')

#     def create(self, validated_data):
#         user = Player(
#             username=validated_data['username'],
#             email=validated_data['email'],
#             firstname=validated_data['firstname'],
#             lastname=validated_data['lastname'],
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

    def validate_username(self, value):
        if Player.objects.filter(username=value).exists():
            raise serializers.ValidationError("Username already exists.")
        return value

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

    def update(self, instance, validated_data):
        instance.firstname = validated_data.get('firstname', instance.firstname)
        instance.lastname = validated_data.get('lastname', instance.lastname)
        instance.email = validated_data.get('email', instance.email)
        instance.username = validated_data.get('username', instance.username)

        password = validated_data.get('password', None)
        if password:
            instance.set_password(password)

        instance.save()
        return instance
    
    def delete(self, instance):
        instance.delete()