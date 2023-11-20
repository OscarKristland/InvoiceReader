import React, { useEffect, useState } from "react";

interface Props {}

const Home = (props: Props) => {
  const [invoiceList, setinvoiceList] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/get_invoice_list/")
      .then((response) => response.json())
      .then((data) => setinvoiceList(data))
      .catch((error) => console.error(error));
    console.log(invoiceList);
  }, []);
  return <div className="">
    {invoiceList.map((invoice: any) =>(
      <li key={invoice.id}>
        {invoice.invoice_number}
      </li>
    ))}
  </div>;
};

export default Home;
