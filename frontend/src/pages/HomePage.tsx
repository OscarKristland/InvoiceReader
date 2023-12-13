import React, { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Uploader } from "../components/Uploader";

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

interface Props {}

const Home = (props: Props) => {
  const [invoiceList, setinvoiceList] = useState([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [pageNumber, setPageNumber] = useState(1);

  // useEffect(() => {
  //   fetch("http://127.0.0.1:8000/get_invoice_list/")
  //     .then((response) => response.json())
  //     .then((data) => setinvoiceList(data))
  //     .catch((error) => console.error(error));
  //   console.log(invoiceList);
  // }, []);

  // const handleView = (file: File) => {
  //     console.log("PDF URL:", file);
  //     setSelectedFile(file);
  //     setPageNumber(1);
  //   };

  return(
    <div>
      <div>
        <Uploader />
      </div>
      <div>
      </div>
    </div>
  )
    
};

export default Home;
