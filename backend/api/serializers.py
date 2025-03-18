from rest_framework import routers, serializers, viewsets
from django.contrib.auth.models import User
from api.models import Category
from .models import InPersonVisitForm, PhoneCallForm, ReportsCalls, ReportsVisits,ReportsEmails
from .models import Task

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
    report = serializers.PrimaryKeyRelatedField(queryset=ReportsVisits.objects.all())


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

class ReportsVisitsSerializer(serializers.ModelSerializer):
    forms = InPersonVisitFormSerializer(many=True, read_only=True)
    class Meta:
        model = ReportsVisits
        fields = ['id', 'starting_month_year', 'forms']
class CategorySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "name"]

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'
        


class ReportsEmailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReportsEmails
        fields = ['metadata', 'content']

    def to_representation(self, instance):
        return {
            'metadata': {
                'id': instance.metadata.get('id'),
                'date': instance.metadata.get('date'),
                'type': instance.metadata.get('type')
            },
            'content': instance.content
        }