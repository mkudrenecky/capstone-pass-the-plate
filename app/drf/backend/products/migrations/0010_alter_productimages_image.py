# Generated by Django 4.0.10 on 2024-01-19 04:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0009_product_allergens'),
    ]

    operations = [
        migrations.AlterField(
            model_name='productimages',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to=''),
        ),
    ]
