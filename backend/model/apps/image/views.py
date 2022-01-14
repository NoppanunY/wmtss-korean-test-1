from django.shortcuts import render
from .serializers import ImageSerializer
from .models import Image
from rest_framework import viewsets

class ImageView(viewsets.ModelViewSet):
    serializer_class = ImageSerializer
    queryset = Image.objects.all()