import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import * as XLSX from 'xlsx';

const ExcelUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [excelData, setExcelData] = useState(null);
  const navigate= useNavigate();
  
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
  
        const dataArr = [];
        let foundUPC = false; // Track if the first "UPC" row has been found
  
        for (let rowIndex = range.s.r; rowIndex <= range.e.r; rowIndex++) {
          const row = [];
  
          let isEmptyRow = true;
  
          for (let colIndex = range.s.c; colIndex <= range.e.c; colIndex++) {
            const cellAddress = { r: rowIndex, c: colIndex };
            const cellRef = XLSX.utils.encode_cell(cellAddress);
            const cell = sheet[cellRef];
            const cellValue = cell ? cell.v : null;
  
            // Skip subsequent rows with "UPC" after the first "UPC" row
            if (foundUPC && colIndex === range.s.c && cellValue === "UPC") {
              isEmptyRow = true;
              break;
            }
  
            // Update foundUPC when the first "UPC" row is encountered
            if (colIndex === range.s.c && cellValue === "UPC") {
              foundUPC = true;
            }
  
            row.push(cellValue);
  
              // Check if it's the 2nd cell and has a value
            if (colIndex === range.s.c + 1 && (cellValue === null || cellValue === undefined || cellValue === '')) {
              isEmptyRow = true;
              break; // If the 2nd cell is empty, consider the row as empty and break out of the loop
            }

            // Check if it's one of the first 4 cells and has a value
            if (colIndex <= range.s.c + 2 && (cellValue !== null && cellValue !== undefined && cellValue !== '')) {
              isEmptyRow = false;
            }

          }
  
          // Only add the row if the first cell is not "UPC" and the first 4 cells are not all empty
          if (!isEmptyRow) {
            dataArr.push(row);
          }
        }
  
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
      <button className = "backbutton" onClick={() => navigate(-1)}>{"<< Back"}</button>
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
      <br/>
      <button onClick={handleSubmit} className="logbutton">Submit</button>
    </div>
  );
};

export default ExcelUploader;
