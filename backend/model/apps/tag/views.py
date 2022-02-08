from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import render
from .serializers import TagSerializer
from .models import Tag
from rest_framework import viewsets

class TagView(viewsets.ModelViewSet):
    serializer_class = TagSerializer
    queryset = Tag.objects.all()

    def create(self, request):
        request.data._mutable = True
        request.data["name"] = "new"
        serializer = TagSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({"status": "error", "data": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)