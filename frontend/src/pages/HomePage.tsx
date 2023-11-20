import React, { useEffect, useState } from "react";

interface Props {}

const Home = (props: Props) => {

  const [invoiceList, setinvoiceList] = useState([]);
    
    useEffect(() => {
        fetch('http://127.0.0.1:8000/get_invoice_list/')
        .then(response => response.json())
        .then(data => setinvoiceList(data))
        .catch(error => console.error(error));
        console.log(invoiceList)
    }, []);

  return (
    <div className="bg-black">
    </div>
  );
};

export default Home;
