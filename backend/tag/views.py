from django.shortcuts import render
from .serializers import TagSerializer
from .models import Tag
from rest_framework import viewsets

class TagView(viewsets.ModelViewSet):
    serializer_class = TagSerializer
    queryset = Tag.objects.all()