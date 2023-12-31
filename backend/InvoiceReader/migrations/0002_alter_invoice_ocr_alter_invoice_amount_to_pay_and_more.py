# Generated by Django 4.2.7 on 2023-11-17 13:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('InvoiceReader', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='invoice',
            name='OCR',
            field=models.CharField(max_length=20, null=True),
        ),
        migrations.AlterField(
            model_name='invoice',
            name='amount_to_pay',
            field=models.DecimalField(
                decimal_places=2, max_digits=10, null=True),
        ),
        migrations.AlterField(
            model_name='invoice',
            name='client_number',
            field=models.CharField(max_length=20, null=True),
        ),
        migrations.AlterField(
            model_name='invoice',
            name='due_date',
            field=models.DateField(null=True),
        ),
        migrations.AlterField(
            model_name='invoice',
            name='invoice_number',
            field=models.CharField(max_length=20, null=True, unique=True),
        ),
        migrations.AlterField(
            model_name='invoice',
            name='recipient_address',
            field=models.TextField(null=True),
        ),
        migrations.AlterField(
            model_name='invoice',
            name='recipient_name',
            field=models.CharField(max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='invoice',
            name='sender_address',
            field=models.TextField(null=True),
        ),
        migrations.AlterField(
            model_name='invoice',
            name='sender_reference',
            field=models.CharField(max_length=40, null=True),
        ),
    ]
