from datetime import datetime
from django.shortcuts import render
from django.views import View
from django.core.exceptions import ObjectDoesNotExist
from rest_framework import routers, serializers, viewsets, views
from django.contrib.auth.models import User
from .serializers import UserSerializer, CategorySerializer, ReportsCallsSerializer
from .models import Category
from django.contrib.auth import login, logout
from knox.views import LoginView as KnoxLoginView
from django.http import HttpResponse, JsonResponse
from rest_framework.authtoken.serializers import AuthTokenSerializer
from .models import InPersonVisitForm, PhoneCallForm, ReportsCalls
from .serializers import InPersonVisitFormSerializer, PhoneCallFormSerializer
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
            token = request.headers.get("Authorization")
            if token:
                # Microsoft Graph API validation is sufficient
                graph_response = requests.get(
                    "https://graph.microsoft.com/v1.0/me",
                    headers={"Authorization": token},
                )
                if graph_response.status_code != 200:
                    return HttpResponse(status=401)
            try:
                user = User.objects.get(username=request.data["email"])
            except User.DoesNotExist:
                user = User.objects.create_user(
                    request.data["email"], request.data["email"], None
                )

            login(request, user)
            return super(LoginView, self).post(request, format=None)
        except Exception as e:
            return HttpResponse(status=500)


class LogoutView(viewsets.ViewSet):
    def destroy(self, request, *args, **kwargs):
        logout(request)
        return HttpResponse(status=200)


class InPersonVisitViewSet(viewsets.ModelViewSet):
    queryset = InPersonVisitForm.objects.all()
    serializer_class = InPersonVisitFormSerializer


class PhoneCallViewSet(viewsets.ModelViewSet):
    queryset = PhoneCallForm.objects.all()
    serializer_class = PhoneCallFormSerializer

    def create(self, request, *args, **kwargs):
        # Check if report for the current month-year exists, create one otherwise
        form_date = datetime.strptime(request.data["date"], "%Y-%m-%d")
        current_report_date = datetime(form_date.year, form_date.month, 1)
        try:
            request.data._mutable = True
        except Exception:
            pass
        request.data["report"] = ReportsCalls.objects.get_or_create(
            starting_month_year__month=current_report_date.month,
            starting_month_year__year=current_report_date.year,
            defaults={"starting_month_year": current_report_date},
        )[0].pk
        try:
            request.data._mutable = False
        except Exception:
            pass
        return super().create(request, *args, **kwargs)


class CategoryView(viewsets.ModelViewSet):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()


class ReportsCallsView(viewsets.ModelViewSet):
    serializer_class = ReportsCallsSerializer
    queryset = ReportsCalls.objects.all()

    def create(self, request, *args, **kwargs):
        return Response(status=403)

    def update(self, request, *args, **kwargs):
        return Response(status=403)

    def destroy(self, request, *args, **kwargs):
        return Response(status=403)


@api_view(["GET"])
def get_emails(request):
    try:
        category = request.GET.get("category")
        token = request.headers.get("Authorization")

        print(f"Category: {category}")
        print(f"Token: {token}")

        if not token:
            return Response({"error": "No authorization token"}, status=401)

        endpoint = "https://graph.microsoft.com/v1.0/me/messages"

        if category == "Uncategorized":
            filter_query = "parentFolderId eq 'inbox' and not categories/any()"
        elif category:
            filter_query = (
                f"parentFolderId eq 'inbox' and categories/any(c: c eq '{category}')"
            )
        else:
            filter_query = "parentFolderId eq 'inbox'"

        params = {
            "$filter": filter_query,
            "$select": "id,subject,from,sender,receivedDateTime,bodyPreview,categories",
        }

        print(f"Graph API request: {endpoint}")
        print(f"Params: {params}")

        response = requests.get(
            endpoint, params=params, headers={"Authorization": token}
        )

        if response.status_code != 200:
            return Response(
                {"error": f"Graph API error: {response.text}"},
                status=response.status_code,
            )

        return Response(response.json())
    except Exception as e:
        print(f"Error in get_emails: {str(e)}")
        return Response({"error": str(e)}, status=500)


@api_view(["POST"])
def login(request):
    token = request.headers.get("Authorization")
    if not token:
        return Response({"error": "No token provided"}, status=401)

    # Verify token with Microsoft
    graph_response = requests.get(
        "https://graph.microsoft.com/v1.0/me", headers={"Authorization": token}
    )
    if graph_response.status_code != 200:
        return Response({"error": "Invalid token"}, status=401)

    return Response({"status": "authenticated"})
