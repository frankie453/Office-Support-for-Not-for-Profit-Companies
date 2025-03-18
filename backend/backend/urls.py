from django.contrib import admin
from django.urls import include, path
from api.views import (
    home, 
    InPersonVisitViewSet, 
    PhoneCallViewSet,
    CategoryView,
    get_emails,
    ReportsEmailsView,
    generate_monthly_report,
    get_email_reports,
    ReportsCallsView,
    ReportsVisitsView
)
from rest_framework import routers
from api.views import CategoryView
from api.views import get_emails
from api.views import TaskView  

router = routers.DefaultRouter()
router.register(r'form/visits', InPersonVisitViewSet)
router.register(r'form/calls', PhoneCallViewSet)
router.register(r"categories", CategoryView)
router.register(r"tasks", TaskView)
router.register(r"reports/emails", ReportsEmailsView)
router.register(r"reports/calls", ReportsCallsView)
router.register(r"reports/visits", ReportsVisitsView)

urlpatterns = [
    path('api/generate-monthly-report/', generate_monthly_report, name='generate_monthly_report'),
    path("", home),
    path("api/", include(router.urls)),
    path("admin/", admin.site.urls),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('api/emails/', get_emails, name='get_emails'),
   
    path('api/reports/emails/', get_email_reports, name='get_email_reports'),
]
