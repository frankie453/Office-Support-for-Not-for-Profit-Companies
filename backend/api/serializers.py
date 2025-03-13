from rest_framework import routers, serializers, viewsets
from django.contrib.auth.models import User
from api.models import Category
from .models import InPersonVisitForm, PhoneCallForm, ReportsCalls

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
    report = serializers.PrimaryKeyRelatedField(queryset=ReportsCalls.objects.all())

class ReportsCallsSerializer(serializers.ModelSerializer):
    forms = PhoneCallFormSerializer(many=True, read_only=True)
    class Meta:
        model = ReportsCalls
        fields = ['id', 'starting_month_year', 'forms']

class CategorySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "name"]