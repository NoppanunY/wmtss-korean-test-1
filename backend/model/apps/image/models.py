from django.db import models
from model.apps.bin.models import Bin

class Image(models.Model):
    image = models.ImageField(upload_to="src/image", blank=True, null=True)

    bin_id = models.ForeignKey(Bin, on_delete=models.DO_NOTHING)

    class Meta:
        db_table = "wmtss_image"
