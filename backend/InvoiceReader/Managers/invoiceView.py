from django.http import JsonResponse
from django.shortcuts import render
import os
from InvoiceReader.ocr_processor import process_uploaded_document, query_model
from rest_framework.response import Response
from rest_framework.decorators import api_view
from InvoiceReader.serializers import invoiceSerializer
from rest_framework import status
from InvoiceReader.models.invoiceModel import InvoiceDocument


@api_view(['POST'])
def upload_file(request):
    if request.method == 'POST' and request.FILES:
        uploaded_file = request.FILES['document']
        invoice_doc = process_uploaded_document(
            uploaded_file, InvoiceDocument)

        # Retrieve OCR results
        output_total_amount = query_model(
            invoice_doc.document.path, "What is the total amount?")
        output_invoice_number = query_model(
            invoice_doc.document.path, "What is the invoice number?")
        output_invoice_sender = query_model(
            invoice_doc.document.path, "Who is this from?")
        output_invoice_recipient = query_model(
            invoice_doc.document.path, "Who is the sent to?")
        output_invoice_duedate = query_model(
            invoice_doc.document.path, "When is the due date?")

        return Response({'detail': 'File uploaded and processed successfully'}, status=status.HTTP_201_CREATED)

    return Response({'detail': 'No file uploaded'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_invoice_list(request):
    print("get-request started")
    if request.method == 'GET':
        list_items = InvoiceDocument.objects.all()
        data = []
        for item in list_items:
            file_path = item.document.path
            total_amount = query_model(file_path, "What is the total amount?")
            invoice_number = query_model(
                file_path, "What is the invoice number?")
            sender = query_model(file_path, "Who is this from?")
            recipient = query_model(file_path, "Who is the sent to?")
            due_date = query_model(file_path, "When is the due date?")

            invoice_data = {
                'id': item.id,
                'document': item.document.url,
                'name': os.path.basename(item.document.name),
                'totalAmount': total_amount,
                'sender': sender,
                'recipient': recipient,
                'dueDate': due_date,
                'invoiceNumber': invoice_number,
            }
            data.append(invoice_data)

        return JsonResponse(data, safe=False)

    else:
        return Response({'error': 'Invalid request method'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def clear_table(request):
    try:
        if request.method == 'DELETE':
            print("Delete request started")
            InvoiceDocument.objects.all().delete()
            return JsonResponse({'detail': 'All entries deleted successfully'})
        else:
            return JsonResponse({'error': 'Method not allowed'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


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
