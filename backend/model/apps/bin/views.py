from django.shortcuts import render
from .serializers import BinSerializer
from .models import Bin
from rest_framework import viewsets

class BinView(viewsets.ModelViewSet):
    serializer_class = BinSerializer
    queryset = Bin.objects.all()