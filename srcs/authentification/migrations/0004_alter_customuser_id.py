# Generated by Django 5.1.2 on 2024-10-20 18:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentification', '0003_auto_20240902_1710'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='id',
            field=models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
    ]
