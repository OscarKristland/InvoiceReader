from Models import invoiceModel
from rest_framework import serializers


class InvoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = invoiceModel
        fields = "__all__"
