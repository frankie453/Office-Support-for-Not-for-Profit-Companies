from django.contrib import admin
from .models import InPersonVisitForm, PhoneCallForm

# Register your models here.
admin.site.register(InPersonVisitForm)
admin.site.register(PhoneCallForm)