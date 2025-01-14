import React from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";

const DownloadPDF = ({ data }) => {
  const downloadPdf = () => {
    const doc = new jsPDF('landscape'); // Set to landscape mode

    // Add title or other formatting
    doc.setFontSize(18);
    doc.text("Transaction Data", 14, 20);

    // Prepare the table header and data
    const tableColumn = [
      "Account Holder Name",
      "Account Number",
      "Amount",
      "Bank Name",
      "Cheque Date",
      "Cheque Number",
      "Downloaded Date",
      "Kiosk Name",
      "Pay Account Holder Name",
      "Pay Account Number",
      "Phone Number",
      "Remarks",
      "Remarks Date",
      "Request Date",
      "Session",
      "Source Remarks",
      "Status",
      "User Name",
    ];
    const tableRows = [];

    const itemData = [
      data.accountHolderName,
      data.accountNumber,
      data.amount,
      data.bankName,
      new Date(data.chequeDate).toLocaleString(),
      data.chequeNumber,
      new Date(data.downloadedDate).toLocaleString(),
      data.kioskName,
      data.payAccountHolderName,
      data.payAccountNumber,
      data.phoneNumber,
      data.remarks,
      new Date(data.remarksDate).toLocaleString(),
      new Date(data.requestDate).toLocaleString(),
      data.session,
      data.sourceRemarks,
      data.status,
      data.userName,
    ];

    tableRows.push(itemData);

    // Add the table to the PDF
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 30, // Set the start position for the table
      theme: 'striped', // Optional: Add theme to the table
    });

    // Save the PDF
    doc.save("transaction-data.pdf");
  };

  return <button onClick={downloadPdf}>Download PDF</button>;
};

export default DownloadPDF;
