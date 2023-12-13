import requests
import base64
import re

API_URL = "https://api-inference.huggingface.co/models/impira/layoutlm-document-qa"
headers = {"Authorization": "Bearer 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"}

# Function that takes an image and then a question.
# Which is how the questions then are structured.
# First a reference to a picture and then a what then question is.


def query_model(image_path, question):
    with open(image_path, "rb") as f:
        img = f.read()
    payload = {
        "inputs": {"image": base64.b64encode(img).decode("utf-8"), "question": question}
    }
    response = requests.post(API_URL, headers=headers, json=payload)
    return response.json()[0]["answer"]


def process_uploaded_document(uploaded_file, document_model):
    print(uploaded_file)
    invoice_doc = document_model(document=uploaded_file)
    invoice_doc.save()
    print("File Path:", invoice_doc.document.path)

    file_path = invoice_doc.document.path
    print("File Path:", file_path)

    # Q1: What is the Total amount?
    output_total_amount = query_model(file_path, "What is the total amount?")
    print("Total Amount:", output_total_amount)

    # Q2: What is the invoice number?
    output_invoice_number = query_model(
        file_path, "What is the invoice number?")
    invoice_number_match = re.search(r'[\d/]+', output_invoice_number)
    if invoice_number_match:
        invoice_number = invoice_number_match.group()
        print("Invoice Number:", invoice_number)
    else:
        print("Invoice number not found in OCR results.")

    # Q3: Who is the sender?
    output_invoice_sender = query_model(file_path, "Who is this from?")
    print("Sender:", output_invoice_sender)

    # Q4: Who is this for?
    output_invoice_recipient = query_model(file_path, "Who is the sent to?")
    print("Recipient:", output_invoice_recipient)

    # Q5: When is the bill due?
    output_invoice_duedate = query_model(file_path, "When is the due date?")
    print("Due date:", output_invoice_duedate)

    return invoice_doc


# # Q1: What is the Total amount?
# output_total_amount = query_model(
#     r"C:\Users\ole_b\source\LIA\Faktura projekt\backend\media\invoice_documents\Sample_pdf3.png",
#     "What is the Total amount?",
# )
# print("Total amount:" + output_total_amount)

# # Q2: What is the invoice number?
# output_invoice_number = query_model(
#     r"C:\Users\ole_b\source\LIA\Faktura projekt\backend\media\invoice_documents\Sample_pdf3.png",
#     "What is the invoice number?",
# )
# print("Invoice number:" + output_invoice_number)

# # Q3: Who is the sender?
# output_invoice_sender = query_model(
#     r"C:\Users\ole_b\source\LIA\Faktura projekt\backend\media\invoice_documents\Sample_pdf3.png",
#     "Who is this from?"
# )
# print("Sender:" + output_invoice_sender)

# # Q4: Who is this for?
# output_invoice_recipient = query_model(
#     r"C:\Users\ole_b\source\LIA\Faktura projekt\backend\media\invoice_documents\Sample_pdf3.png",
#     "Who is the sent to?"
# )
# print("Recipient:" + output_invoice_recipient)

# # Q5: When is the bill due?
# output_invoice_duedate = query_model(
#     r"C:\Users\ole_b\source\LIA\Faktura projekt\backend\media\invoice_documents\Sample_pdf3.png",
#     "When is the due date?"
# )
# print("Due date:" + output_invoice_duedate)
