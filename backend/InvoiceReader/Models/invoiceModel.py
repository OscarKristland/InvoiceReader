from django.db import models


class Invoice(models.Model):
    OCR = models.CharField(max_length=20, null=True)
    invoice_number = models.CharField(max_length=20, unique=True, null=True)
    client_number = models.CharField(max_length=20, null=True)
    due_date = models.DateField(null=True)
    amount_to_pay = models.DecimalField(
        max_digits=10, decimal_places=2, null=True)

    sender_address = models.TextField(null=True)
    # namnet på vem som skickar, vill ha betalt
    sender_reference = models.CharField(max_length=40, null=True)

    recipient_name = models.CharField(max_length=50, null=True)
    recipient_address = models.TextField(null=True)

    def __str__(self):
        return self.name
