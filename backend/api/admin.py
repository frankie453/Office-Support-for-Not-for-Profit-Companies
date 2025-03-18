from django.contrib import admin
from .models import InPersonVisitForm, PhoneCallForm
from api.models import Category
from api.models import ReportsEmails

# Register your models here.
admin.site.register(InPersonVisitForm)
admin.site.register(PhoneCallForm)
admin.site.register(Category)
admin.site.register(ReportsEmails)


