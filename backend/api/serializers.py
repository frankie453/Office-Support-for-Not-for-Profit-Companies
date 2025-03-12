from rest_framework import routers, serializers, viewsets
from django.contrib.auth.models import User
from .models import Task

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'email', 'password', 'username']
    password = serializers.CharField(allow_blank=True)
    username = serializers.CharField(allow_blank=True)

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['id', 'title', 'details', 'status']
        extra_kwargs = {
            'details': {'allow_blank': True}
        }
