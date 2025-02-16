from django.shortcuts import render
from django.views import View
from rest_framework import routers, serializers, viewsets
from django.contrib.auth.models import User
from .serializers import UserSerializer, CategorySerializer
from .models import Category
from django.contrib.auth import login, logout
from knox.views import LoginView as KnoxLoginView
# Create your views here.
from django.http import HttpResponse, JsonResponse
from rest_framework.authtoken.serializers import AuthTokenSerializer
import platform
from rest_framework.decorators import api_view
from rest_framework.response import Response
import requests

def home(request):
    return JsonResponse({"message": "Hello from Django!"})

class LoginView(KnoxLoginView):
    authentication_classes = []
    permission_classes = []
    serializer_class = UserSerializer

    def post(self, request, *args, **kwargs):
        try:
            token = request.headers.get('Authorization')
            if token:
                # Microsoft Graph API validation is sufficient
                graph_response = requests.get(
                    'https://graph.microsoft.com/v1.0/me',
                    headers={'Authorization': token}
                )
                if graph_response.status_code != 200:
                    return HttpResponse(status=401)
            try:
                user = User.objects.get(username=request.data["email"])
            except User.DoesNotExist:
                user = User.objects.create_user(request.data["email"], request.data["email"], None)
            
            login(request, user)
            return super(LoginView, self).post(request, format=None)
        except Exception as e:
            return HttpResponse(status=500)

class LogoutView(viewsets.ViewSet):
    def destroy(self, request, *args, **kwargs):
        logout(request)
        return HttpResponse(status=200)

class CategoryView(viewsets.ModelViewSet):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()
    
@api_view(['GET'])
def get_emails(request):
    try:
        category = request.GET.get('category')
        token = request.headers.get('Authorization')
        
        print(f"Category: {category}")
        print(f"Token: {token}")
        
        if not token:
            return Response({'error': 'No authorization token'}, status=401)

        endpoint = "https://graph.microsoft.com/v1.0/me/messages"
        
        if category == 'Uncategorized':
            filter_query = "parentFolderId eq 'inbox' and not categories/any()"
        elif category:
            filter_query = f"parentFolderId eq 'inbox' and categories/any(c: c eq '{category}')"
        else:
            filter_query = "parentFolderId eq 'inbox'"
            
        params = {
            '$filter': filter_query,
            '$select': 'id,subject,from,sender,receivedDateTime,bodyPreview,categories'
        }
        
        print(f"Graph API request: {endpoint}")
        print(f"Params: {params}")
        
        response = requests.get(
            endpoint,
            params=params,
            headers={'Authorization': token}
        )
        
        
        if response.status_code != 200:
            return Response(
                {'error': f'Graph API error: {response.text}'}, 
                status=response.status_code
            )
            
        return Response(response.json())
    except Exception as e:
        print(f"Error in get_emails: {str(e)}")
        return Response({'error': str(e)}, status=500)

@api_view(['POST'])
def login(request):
    token = request.headers.get('Authorization')
    if not token:
        return Response({'error': 'No token provided'}, status=401)
        
    # Verify token with Microsoft
    graph_response = requests.get(
        'https://graph.microsoft.com/v1.0/me',
        headers={'Authorization': token}
    )
    if graph_response.status_code != 200:
        return Response({'error': 'Invalid token'}, status=401)
        
    return Response({'status': 'authenticated'})
    