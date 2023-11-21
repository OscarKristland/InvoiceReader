import React, { DragEvent, ChangeEvent, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

export function Uploader() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);


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
          // You can handle the success response here if needed
        } else {
          console.error('Failed to upload file');
          // Handle error response here
        }
      } catch (error) {
        console.error('Error during file upload:', error);
        // Handle other errors here
      }

      setUploadedFiles((prevFiles) => [...prevFiles, selectedFile]);
    } else {
      console.log("No file selected");
    }
  };


  // const handleUpload = () => {
  //   if (selectedFile) {
  //     console.log("Uploading file:", selectedFile);
  //     setUploadedFiles((prevFiles) => [...prevFiles, selectedFile]);
  //   } else {
  //     console.log("No file selected");
  //   }
  // };

  // const handleView = () => {
  //   if (selectedFile) {
  //     // Display the PDF using react-pdf
  //     // You can set the PDF source to the selected file
  //     // and use the Viewer component from react-pdf
  //     setPageNumber(1);
  //   } else {
  //     console.log("No file selected");
  //   }
  // }

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
      {/* <button
        onClick={handleView}
        type="button"
        className="mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        View PDF
      </button> */}
      {/* {selectedFile && (
        <div style={{ width: '100%', height: '500px' }}>
          <Document
            file={URL.createObjectURL(selectedFile)}
            onLoadSuccess={({ numPages }) => setNumPages(numPages)}
          >
            <Page pageNumber={pageNumber} />
          </Document>
        </div>
      )} */}
      {/* <div>
        {uploadedFiles.length > 0 && (
          <div>
            <h2>Uploaded Files:</h2>
            <ul>
              {uploadedFiles.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          </div>
        )}
      </div> */}
    </div>
  );
}
