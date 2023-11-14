from rest_framework.response import Response
from rest_framework.decorators import api_view
from Serializers import invoiceSerializer
from rest_framework import status


@api_view(['POST'])
def create_invoice(request):
    if request.method == 'POST':
        serializer = invoiceSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
