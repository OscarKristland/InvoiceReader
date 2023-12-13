from rest_framework import serializers
from InvoiceReader.Models import Invoice


class SerializeInvoice(serializers.ModelSerializer):
    class Meta:
        model = Invoice
        fields = "__all__"
