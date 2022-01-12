from django.db import models
from datetime import datetime
from tag.models import Tag

class Bin(models.Model):
    lat = models.FloatField(max_length=20)
    lng = models.FloatField(max_length=20)
    location = models.TextField()
    type = models.CharField(max_length=50)
    date = models.DateField(default=datetime.now)
    time = models.TimeField(default=datetime(2008, 1, 31, 20, 00, 00))
    description = models.TextField(default=None, blank=True, null=True)
    
    tag = models.ForeignKey(Tag, on_delete=models.DO_NOTHING)

    class Meta:
        db_table = "wmtss_bin"

    def __str__(self):
        return "{}:{} ({})".format(self.lat, self.lng, self.description)
