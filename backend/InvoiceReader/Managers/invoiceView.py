from rest_framework.response import Response
from rest_framework.decorators import api_view
from InvoiceReader.serializers import invoiceSerializer
from rest_framework import status
from InvoiceReader.models.invoiceModel import Invoice


@api_view(['POST'])
def create_invoice(request):
    if request.method == 'POST':
        serializer = invoiceSerializer.SerializeInvoice(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_invoice_list(request):
    if request.method == 'GET':
        listItems = Invoice.objects.all()
        serializer = invoiceSerializer.SerializeInvoice(listItems, many=True)
        return Response(serializer.data)
    else:
        return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)
