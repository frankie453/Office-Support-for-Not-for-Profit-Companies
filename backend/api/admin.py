from django.contrib import admin
from .models import InPersonVisitForm, PhoneCallForm
from api.models import Category

# Register your models here.
admin.site.register(InPersonVisitForm)
admin.site.register(PhoneCallForm)
admin.site.register(Category)

