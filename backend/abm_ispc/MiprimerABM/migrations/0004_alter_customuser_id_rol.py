# Generated by Django 4.2 on 2024-06-01 19:54

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('MiprimerABM', '0003_remove_customuser_apellido_remove_customuser_nombre_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='id_rol',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='roles', to='MiprimerABM.rol'),
        ),
    ]