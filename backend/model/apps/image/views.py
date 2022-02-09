from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import render
from .serializers import ImageSerializer
from .models import Image
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.parsers import JSONParser, MultiPartParser
import base64, binascii

class ImageView(viewsets.ModelViewSet):
    queryset = Image.objects.all()  
    # model = Image
    serializer_class = ImageSerializer
    
    def get_queryset(self):
        queryset = Image.objects.filter(bin=self.request.GET.get('bin'))
        return queryset
    
    # file = 'R0lGODlhAQABAIAAAP///////yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
    # serializer = ImageSerializer(data={'bin_id': 1, 'file': file})
    # @action(detail=True, methods=['post'])
    # def set_password(self, request, pk=None):
    #     print("post")
    # # def create(self, request):
    # #     print("create!")
    def create(self, request, *args, **kwargs):
        # request.data._mutable = True

        # serializer = ImageSerializer(data=request.data)
        
        # if serializer.is_valid():
        #     try:
        #         base64.b64encode(base64.b64decode(request.data["image"]))
        #     except Exception:
        #         return Response({"status": "error", "data": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        #     serializer.save()
        #     return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)
        # else:
        #     return Response({"status": "error", "data": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        # print(request.data["image"])
        for data in request.data["image"]:
            try:
                image_data = base64.b64decode(data["image"], validate=True)
                # base64.b64encode(base64.b64decode(data["image"]))
            except binascii.Error:
                print("Type Error")
                return Response({"status": "error", "data": ""}, status=status.HTTP_400_BAD_REQUEST)
            # serializer = ImageSerializer(data=req.data)
            # try:
            #     base64.b64encode(base64.b64decode(req.data["image"]))
            # except Exception:
            #     return Response({"status": "error", "data": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

        is_many = isinstance(request.data["image"], list)
        if not is_many:
            return super(ImageView, self).create(request.data, *args, **kwargs)
        else:
            serializer = self.get_serializer(data=request.data["image"], many=True)
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)