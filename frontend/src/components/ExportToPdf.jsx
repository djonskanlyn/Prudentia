import React from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

const ExportToPdf = () => {
  const exportPDF = async () => {
    const doc = new jsPDF();

    // Grids to be captured by their IDs
    const gridIds = [
      'income-expenditure-table',
      'balance-sheet-table',
      'investments-deposits-table',
      'credit-risk-table',
      'loans-analysis-table',
    ];

    for (let i = 0; i < gridIds.length; i++) {
      const gridElement = document.getElementById(gridIds[i]);

      if (gridElement) {
        const canvas = await html2canvas(gridElement, {
          scale: 2, // High resolution
          useCORS: true,
          backgroundColor: null, // Capture the background as transparent
        });

        const imgData = canvas.toDataURL('image/png');

        const imgWidth = doc.internal.pageSize.getWidth();
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        // Add the image to the PDF
        doc.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

        // If there are more grids, add a new page
        if (i < gridIds.length - 1) {
          doc.addPage();
        }
      } else {
        console.error(`Grid with ID ${gridIds[i]} not found.`);
      }
    }

    // Save the generated PDF
    doc.save('grids_report.pdf');
  };

  return (
    <div>
      <button onClick={exportPDF} className="style-button">
        Export to PDF
      </button>
    </div>
  );
};

export default ExportToPdf;



