from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.parsers import JSONParser, MultiPartParser
import base64, binascii
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from .serializers import ImageSerializer
from .models import Image

# @permission_classes([IsAuthenticated])
# class ImageView(viewsets.ModelViewSet):
class ImageView(viewsets.ModelViewSet):
    queryset = Image.objects.all()  
    # model = Image
    serializer_class = ImageSerializer
    
    def get_queryset(self):
        if self.request.GET.get('bin') != None:
            queryset = Image.objects.filter(bin=self.request.GET.get('bin'))
        else:
            queryset = Image.objects.all()
        # serializer = ImageSerializer(images, many=True)
        # return Response({"data": serializer.data})
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

    # def get_object(self, obj_id):
    #     try:
    #         return Image.objects.get(id=obj_id)
    #     except (Image.DoesNotExist):
    #         raise status.HTTP_400_BAD_REQUEST

    # def validate_ids(self, id_list):
    #     for id in id_list:
    #         try:
    #             Image.objects.get(id=id)
    #         except (Image.DoesNotExist):
    #             raise status.HTTP_400_BAD_REQUEST
    #     return True

    # def update(self, request, pk=None):
        # print(request.data)
    # def update(self, request, pk=None):
    #     data = request.data
    #     ticket_ids = [i['ticket_id'] for i in data]
    #     self.validate_ids(ticket_ids)
    #     instances = []
    #     for temp_dict in data:
    #         bin_id = temp_dict['bin']
    #         image = temp_dict['image']
    #         # description = temp_dict['description']

    #         obj = self.get_object(bin_id)
    #         obj.image = image
    #         # obj.description = description
    #         obj.save()
    #         instances.append(obj)