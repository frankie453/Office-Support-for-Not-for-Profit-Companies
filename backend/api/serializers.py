from rest_framework import routers, serializers, viewsets
from django.contrib.auth.models import User

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'email', 'password', 'username']
    password = serializers.CharField(allow_blank=True)
    username = serializers.CharField(allow_blank=True)