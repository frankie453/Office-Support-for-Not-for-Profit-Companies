from datetime import datetime
from django.shortcuts import render
from django.views import View
from django.core.exceptions import ObjectDoesNotExist
from rest_framework import routers, serializers, viewsets, views
from django.contrib.auth.models import User
from .serializers import UserSerializer, CategorySerializer, ReportsCallsSerializer, ReportsVisitsSerializer, ReportsEmailsSerializer
from .models import Category, InPersonVisitForm, PhoneCallForm, ReportsCalls, ReportsVisits, ReportsEmails
from django.contrib.auth import login, logout
from knox.views import LoginView as KnoxLoginView
from django.http import HttpResponse, JsonResponse
from rest_framework.authtoken.serializers import AuthTokenSerializer
from .serializers import InPersonVisitFormSerializer, PhoneCallFormSerializer
import platform
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
import requests
from .services.graph_service import GraphEmailService


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
    def create(self, request, *args, **kwargs):
        visit_date = datetime.strptime(request.data["date"], "%Y-%m-%d")
        report_date = datetime(visit_date.year, visit_date.month, 1)
        report, created = ReportsVisits.objects.get_or_create(
            starting_month_year=report_date
        )

        request.data["report"] = report.id 

        return super().create(request, *args, **kwargs)    

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

class ReportsVisitsView(viewsets.ModelViewSet):
    serializer_class = ReportsVisitsSerializer
    queryset = ReportsVisits.objects.all()
    def create(self, request, *args, **kwargs):
        return Response(status=403)

    def update(self, request, *args, **kwargs):
        return Response(status=403)

    def destroy(self, request, *args, **kwargs):
        return Response(status=403)

class ReportsEmailsView(viewsets.ModelViewSet):
    serializer_class = ReportsEmailsSerializer
    queryset = ReportsEmails.objects.all()

    def create(self, request, *args, **kwargs):
        return Response(status=403)  # Prevent direct creation through this view

    def update(self, request, *args, **kwargs):
        return Response(status=403)  # Prevent updates

    def destroy(self, request, *args, **kwargs):
        return Response(status=403)  # Prevent deletion

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

@api_view(['GET', 'POST'])  # Allow both GET and POST
def generate_monthly_report(request):
    print(f"Received {request.method} request with data:", request.data)  # Debug print
    if request.method == 'GET':
        return Response({'message': 'Use POST to generate report'})
        
    try:
        token = request.headers.get('Authorization')
        if not token:
            return Response({'error': 'No token provided'}, status=401)

        service = GraphEmailService()
        
        # Get mode and date range from request
        mode = request.data.get('mode', 'month')
        date_range = request.data.get('dateRange')

        # Set date range based on mode
        if mode == 'month':
            today = datetime.now()
            start_date = datetime(today.year, today.month, 1)
            end_date = datetime.now()
        else:
            try:
                start_date = datetime.fromisoformat(date_range['start'].replace('Z', '+00:00'))
                end_date = datetime.fromisoformat(date_range['end'].replace('Z', '+00:00'))
            except (KeyError, ValueError) as e:
                return Response({'error': 'Invalid date range format'}, status=400)

        incoming_filter = "isDraft eq false and parentFolderId eq 'inbox'"
        outgoing_filter = "isDraft eq false and parentFolderId eq 'sentitems'"

        incoming_emails = service.fetch_emails_by_date_range(token, start_date, end_date, incoming_filter)
        outgoing_emails = service.fetch_emails_by_date_range(token, start_date, end_date, outgoing_filter)

        print(f"Found {len(incoming_emails)} incoming and {len(outgoing_emails)} outgoing emails")

        report = ReportsEmails.objects.create(
            metadata={
                'id': ReportsEmails.objects.count() + 1,
                'date': datetime.now().isoformat(),
                'type': 'EMAILS',
            },
            content={
                'incoming': {
                    'total': len(incoming_emails),
                    'byWeek': service.group_by_week(incoming_emails),
                    'byCategory': service.group_by_category(incoming_emails, token)
                },
                'outcoming': {
                    'total': len(outgoing_emails),
                    'byWeek': service.group_by_week(outgoing_emails),
                    'byCategory': service.group_by_category(outgoing_emails, token)
                }
            }
        )

        return Response({
            'metadata': {
                'id': report.metadata['id'],
                'date': report.metadata['date'],
                'type': report.metadata['type']
            },
            'content': report.content
        })

    except Exception as e:
        print(f"Error generating report: {str(e)}")
        return Response({'error': str(e)}, status=500)


@api_view(['GET'])
def get_email_reports(request):
    try:
        print("Fetching email reports...")
        reports = ReportsEmails.objects.all().order_by('-created_at')
        serializer = ReportsEmailsSerializer(reports, many=True)
        data = serializer.data
        print("Returning reports:", data)
        return Response(data)
    except Exception as e:
        print(f"Error in get_email_reports: {str(e)}")
        return Response({'error': str(e)}, status=500)