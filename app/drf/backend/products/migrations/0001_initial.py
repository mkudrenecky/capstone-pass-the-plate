# Generated by Django 4.0.10 on 2023-10-16 03:48

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=120)),
                ('content', models.TextField(blank=True, null=True)),
                ('location', models.CharField(blank=True, max_length=250, null=True)),
            ],
        ),
    ]