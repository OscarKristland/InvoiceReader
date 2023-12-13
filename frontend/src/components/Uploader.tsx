import React, { DragEvent, ChangeEvent, useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";

interface Invoice {
    id: number;
    document: string;
    name: string;
    totalAmount: string;
    sender: string;
    recipient: string;
    dueDate: string;
    invoiceNumber: string;
}

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

export function Uploader() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [fileUploaded, setFileUploaded] = useState<boolean>(false);
  const [invoices, setInvoices] = useState<Invoice[]>([]);


  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files?.[0];

      setSelectedFile(file || null);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      setSelectedFile(file);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleUpload = async () => {
    if (selectedFile) {
      console.log("Uploading file:", selectedFile);

      const formData = new FormData();
      formData.append('document', selectedFile);

      try {
        const response = await fetch('http://127.0.0.1:8000/upload_file/', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          console.log('File uploaded successfully');
          setFileUploaded(true);
        } else {
          console.error('Failed to upload file');
        }
      } catch (error) {
        console.error('Error during file upload:', error);
      }

      setUploadedFiles((prevFiles) => [...prevFiles, selectedFile]);
    } else {
      console.log("No file selected");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (fileUploaded) { 
          const response = await fetch('http://127.0.0.1:8000/get_invoice_list/');
          const data = await response.json();
          console.log('Raw Response:', data);
          setInvoices(data);
        }
      } catch (error) {
        console.error('Error fetching invoice list:', error);
      }
    };

    fetchData();
  }, [fileUploaded]);

  return (
    <div
      className="flex flex-col items-center justify-center w-full"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <label
        htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center w-full h-64 w-72 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <svg
            className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold">Click to upload</span> or drag and
            drop
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">.PDF</p>
        </div>
        <input
          id="dropzone-file"
          type="file"
          accept=".pdf"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>
      <button
        onClick={handleUpload}
        type="button"
        className="mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Upload PDF
      </button>
      <div>
      <div>
        <h1>Invoice List</h1>
          {invoices.map((item) => (
            <div key={item.id}>
              <p>Document: {item.document}</p>
              <p>Name: {item.name}</p>
              <p>Total Amount: {item.totalAmount}</p>
              <p>Sender: {item.sender}</p>
              <p>Recipient: {item.recipient}</p>
              <p>Due Date: {item.dueDate}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
