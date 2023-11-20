import React, { useState } from 'react';
import * as XLSX from 'xlsx';

const ExcelUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [excelData, setExcelData] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    // Read the Excel file
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        // Skip the first 6 rows
        const range = XLSX.utils.decode_range(sheet['!ref']);
        range.s.r = 6; // start from the 7th row

        const dataArr = XLSX.utils.sheet_to_json(sheet, { header: 1, range });

        // Round numbers to two decimal places
        const roundedData = dataArr.map((row) =>
          row.map((cell) =>
            typeof cell === 'number' ? Number(cell.toFixed(2)) : cell
          )
        );

        setExcelData(roundedData);
      };
      reader.readAsBinaryString(file);
    }
  };

  const handleSubmit = () => {
    if (selectedFile) {
      // You can perform additional logic here, such as sending the file to a server
      console.log('File submitted:', selectedFile);
    } else {
      console.log('No file selected');
    }
  };

  return (
    <div>
      <h2>ExcelUploader</h2>
      <input type="file" onChange={handleFileChange} accept=".xls, .xlsx" />

      {excelData && (
        <div>
          <h3>Preview:</h3>
          <table className="excel-table">
            <thead>
              <tr>
                {excelData[0].map((cell, index) => (
                  <th key={index}>{cell}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {excelData.slice(1).map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default ExcelUploader;
