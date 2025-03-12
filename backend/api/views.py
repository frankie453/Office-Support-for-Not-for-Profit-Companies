from django.shortcuts import render
from django.views import View
from rest_framework import routers, serializers, viewsets
from django.contrib.auth.models import User
from .serializers import UserSerializer, TaskSerializer
from .models import Task
from django.contrib.auth import login, logout
from knox.views import LoginView as KnoxLoginView
# Create your views here.
from django.http import HttpResponse, JsonResponse
from rest_framework.authtoken.serializers import AuthTokenSerializer
import win32com.client
import pythoncom
import win32com

def home(request):
    return JsonResponse({"message": "Hello from Django!"})

class LoginView(KnoxLoginView):
    authentication_classes = []
    permission_classes = []
    serializer_class = UserSerializer

    def post(self, request, *args, **kwargs):
        # Verify if the account exist in the outlook app
        accounts= win32com.client.Dispatch("Outlook.Application",pythoncom.CoInitialize()).Session.Accounts
        if request.data["email"] not in [account.DeliveryStore.DisplayName for account in accounts]:
            return HttpResponse(status=404)
        
        # Check if exists in database, else create new user with no password
        try:
            user = User.objects.get(username=request.data["email"])
        except User.DoesNotExist:
            user = User.objects.create_user(request.data["email"], request.data["email"], None)
        login(request, user)
        return super(LoginView, self).post(request, format=None)
        

class LogoutView(viewsets.ViewSet):
    def destroy(self, request, *args, **kwargs):
        logout(request)
        return HttpResponse(status=200)
    
class TaskView(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

    def create(self, request, *args, **kwargs):
        print("Incoming data:", request.data)
        return super().create(request, *args, **kwargs)

   