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
        'get_tag',
    )   

    def get_tag(self, obj):
        return obj.tag.name
    get_tag.short_description = 'Tag Name'

admin.site.register(Bin, BinAdmin)