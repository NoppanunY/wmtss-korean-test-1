from django.db import models

class Tag(models.Model):
    name = models.CharField(max_length=50)

    class Meta:
        db_table = "wmtss_tag"

    def __str__(self):
        return self.name