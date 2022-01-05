from django.contrib import admin
from .models import Bin

class BinAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'lat',
        'lng', 
        'location', 
        'type', 
        'date', 
        'time', 
        'description', 
        'tag',
    )

admin.site.register(Bin, BinAdmin)