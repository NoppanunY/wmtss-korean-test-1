from rest_framework import serializers
from .models import Image
# from drf_extra_fields.fields import Base64ImageField
import base64
from django.core.files.base import ContentFile


class ImageSerializer(serializers.ModelSerializer):
    # def __init__(self, *args, **kwargs):
    #     many = kwargs.pop('many', True)
    #     super(ImageSerializer, self).__init__(many=many, *args, **kwargs)

    class Meta:
        model = Image
        fields = (
            'id',
            'image',
            'bin'
        )  
    
        # def create(self, validated_data):
        #     image=validated_data.pop('image')
        #     file = 'R0lGODlhAQABAIAAAP///////yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
        #     bin = 1
            
        #     return Image.objects.create(image=file, bin=bin)