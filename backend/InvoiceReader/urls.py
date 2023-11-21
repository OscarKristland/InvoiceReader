"""
URL configuration for InvoiceReader project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from InvoiceReader.managers.invoiceView import create_invoice, upload_file
from InvoiceReader.managers.invoiceView import get_invoice_list


urlpatterns = [
    path('admin/', admin.site.urls),
    path('create_invoice/', create_invoice, name='create_invoice'),
    path('get_invoice_list/', get_invoice_list, name='get_invoice_list'),
    path('upload_file/', upload_file, name='upload_file')
]
