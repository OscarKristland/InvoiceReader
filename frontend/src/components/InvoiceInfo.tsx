import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { Invoice } from "./Uploader";

interface InvoiceInfoProps {
  invoices: Invoice[];
}

export function InvoiceInfo(props: InvoiceInfoProps) {
  const [openModal, setOpenModal] = useState(false);
  const { invoices } = props;

  

  return (
    <>
      <button
        onClick={() => setOpenModal(true)}
        className="mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Show Invoice
      </button>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header className="p-4">Invoice info</Modal.Header>
        <Modal.Body className="p-4">
          <div className="space-y-6">
            <h1 className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
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
            </h1>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              setOpenModal(false);
            }}
            className="m-2"
          >
            Done
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
