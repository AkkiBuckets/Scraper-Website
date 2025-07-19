from django.contrib import admin
from .models import ScrapedData

@admin.register(ScrapedData)
class ScrapedDataAdmin(admin.ModelAdmin):
    list_display = ('url',)  # customize as needed
