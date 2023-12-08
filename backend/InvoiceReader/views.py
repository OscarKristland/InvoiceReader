import requests
import base64

API_URL = "https://api-inference.huggingface.co/models/impira/layoutlm-document-qa"
headers = {"Authorization": "Bearer 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"}

def query(payload):
    with open(payload["inputs"]["image"], "rb") as f:
        img = f.read()
        payload["inputs"]["image"] = base64.b64encode(img).decode("utf-8")  
    response = requests.post(API_URL, headers=headers, json=payload)
    return response.json()


output = query({
    "inputs": {
        "image": "C:/Users/wahlb/OneDrive/Desktop/Invoice Reader Project/InvoiceReader-1/backend/InvoiceReader/Media/Uploads/Sample-Invoice-printable.png",
        "question": "What is the Total amount?"
    },
})

x = None

if output:
    answer = output[0].get('answer')
    x = answer if answer is not None else x

print(x)

    
output = query({
    "inputs": {
        "image": "C:/Users/wahlb/OneDrive/Desktop/Invoice Reader Project/InvoiceReader-1/backend/InvoiceReader/Media/Uploads/Sample-Invoice-printable.png",
        "question": "What is the invoice number?"
    },
})

y = None

if output:
    answer = output[0].get('answer')
    y = answer if answer is not None else y

print(y)

output = query({
    "inputs": {
        "image": "C:/Users/wahlb/OneDrive/Desktop/Invoice Reader Project/InvoiceReader-1/backend/InvoiceReader/Media/Uploads/Sample-Invoice-printable.png",
        "question": "Who is recieving the invoice?"
    },
})

z = None

if output: 
    answer = output[0].get('answer')
    z = answer if answer is not None else y

print(z)

output = query({
    "inputs": {
        "image": "C:/Users/wahlb/OneDrive/Desktop/Invoice Reader Project/InvoiceReader-1/backend/InvoiceReader/Media/Uploads/Sample-Invoice-printable.png",
        "question": "Who is the invoice from?"
    },
})

q = None

if output: 
    answer = output[0].get('answer')
    q = answer if answer is not None else q

print(q)