from rest_framework import routers, serializers, viewsets
from django.contrib.auth.models import User
from api.models import Category
from .models import InPersonVisitForm, PhoneCallForm, ReportsEmails

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'email', 'password', 'username']
    password = serializers.CharField(allow_blank=True)
    username = serializers.CharField(allow_blank=True)

class InPersonVisitFormSerializer(serializers.ModelSerializer):
    class Meta:
        model = InPersonVisitForm
        fields = '__all__'


class PhoneCallFormSerializer(serializers.ModelSerializer):
    class Meta:
        model = PhoneCallForm
        fields = '__all__'

class CategorySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "name"]

class ReportsEmailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReportsEmails
        fields = ['metadata', 'content']

    def to_representation(self, instance):
        # Ensure format matches frontend expectations
        return {
            'metadata': {
                'id': instance.metadata.get('id'),
                'date': instance.metadata.get('date'),
                'type': instance.metadata.get('type')
            },
            'content': instance.content
        }