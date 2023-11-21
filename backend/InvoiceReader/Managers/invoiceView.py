import os
from rest_framework.response import Response
from rest_framework.decorators import api_view
from InvoiceReader.serializers import invoiceSerializer
from rest_framework import status
from InvoiceReader.models.invoiceModel import Invoice, InvoiceDocument


@api_view(['POST'])
def upload_file(request):
    if request.method == 'POST' and request.FILES:
        uploaded_file = request.FILES['document']
        invoice_doc = InvoiceDocument(document=uploaded_file)
        invoice_doc.save()

        return Response({'detail': 'File uploaded successfully'}, status=status.HTTP_201_CREATED)

    return Response({'detail': 'No file uploaded'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_invoice_list(request):
    if request.method == 'GET':
        list_items = InvoiceDocument.objects.all()
        data = [{'id': item.id, 'document': item.document.url, 'name': os.path.basename(item.document.name)}
                for item in list_items]
        return Response(data)
    else:
        return Response(status=status.HTTP_400_BAD_REQUEST)

# Gammalt post/get-requst, används inte längre


@api_view(['POST'])
def create_invoice(request):
    if request.method == 'POST':
        serializer = invoiceSerializer.SerializeInvoice(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# @api_view(['GET'])
# def get_invoice_list(request):
#     if request.method == 'GET':
#         listItems = Invoice.objects.all()
#         serializer = invoiceSerializer.SerializeInvoice(listItems, many=True)
#         return Response(serializer.data)
#     else:
#         return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)
