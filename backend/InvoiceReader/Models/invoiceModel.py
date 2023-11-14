from django.db import models


class Invoice(models.Model):
    OCR = models.CharField(max_length=20)
    invoice_number = models.CharField(max_length=20, unique=True)
    client_number = models.CharField(max_length=20)
    due_date = models.DateField()
    amount_to_pay = models.DecimalField(max_digits=10, decimal_places=2)

    sender_address = models.TextField()
    # namnet på vem som skickar, vill ha betalt
    sender_reference = models.CharField(max_length=40)

    recipient_name = models.CharField(max_length=50)
    recipient_address = models.TextField()

    def __str__(self):
        return self.name
