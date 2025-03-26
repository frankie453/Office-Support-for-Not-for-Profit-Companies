from django.contrib import admin
from .models import (
    InPersonVisitForm, 
    PhoneCallForm, 
    ReportsCalls, 
    ReportsVisits,
    ReportsEmails,
    Category
)

# Register your models here.
admin.site.register(InPersonVisitForm)
admin.site.register(PhoneCallForm)
admin.site.register(ReportsCalls)
admin.site.register(ReportsVisits)
admin.site.register(ReportsEmails)
admin.site.register(Category)


