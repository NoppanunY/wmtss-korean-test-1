# Generated by Django 4.0.1 on 2022-02-06 05:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('image', '0002_alter_image_bin'),
    ]

    operations = [
        migrations.AlterField(
            model_name='image',
            name='image',
            field=models.BinaryField(blank=True, null=True),
        ),
    ]
