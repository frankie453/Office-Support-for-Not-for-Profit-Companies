from django.contrib import admin
from .models import InPersonVisitForm, PhoneCallForm, ReportsCalls
from api.models import Category

# Register your models here.
admin.site.register(InPersonVisitForm)
admin.site.register(PhoneCallForm)
admin.site.register(ReportsCalls)
admin.site.register(Category)

