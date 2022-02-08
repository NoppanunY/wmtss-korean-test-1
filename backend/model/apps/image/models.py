import base64

from django.db import models
from model.apps.bin.models import Bin

class Image(models.Model):
    # image = models.ImageField(upload_to="src/image", blank=True, null=True)
    # image = models.BinaryField(blank=True, null=True)
    image = models.TextField(blank=True)

    bin = models.ForeignKey(Bin, on_delete=models.DO_NOTHING, related_name='bin_id')

    def set_data(self, data):
        self.image = base64.encodestring(data)
    
    def get_data(self):
        return base64.decodestring(self.image)

    class Meta:
        db_table = "wmtss_image"
