# Generated by Django 4.0.1 on 2022-01-20 19:52

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('tag', '0001_initial'),
        ('bin', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bin',
            name='tag',
            field=models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='tag_name', to='tag.tag'),
        ),
    ]
