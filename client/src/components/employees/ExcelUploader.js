import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';
import { SessionContext } from '../../App';

const ExcelUploader = () => {
  const { sessionId, API_BASE_URL, authorized } = useContext(SessionContext);
  const [selectedFile, setSelectedFile] = useState(null);
  const [excelData, setExcelData] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
  
        // Skip the first 7 rows
        const range = XLSX.utils.decode_range(sheet['!ref']);
        range.s.r = 7; 
        const dataArr = [];
  
        for (let rowIndex = range.s.r; rowIndex <= range.e.r; rowIndex++) {
          const row = [];
  
          let isEmptyRow = true;
  
          for (let colIndex = range.s.c; colIndex <= range.e.c; colIndex++) {
            const cellAddress = { r: rowIndex, c: colIndex };
            const cellRef = XLSX.utils.encode_cell(cellAddress);
            const cell = sheet[cellRef];
            const cellValue = cell ? cell.v : null;
  
            // Skip rows where the first column is 'UPC' or the second column is 'CC CHARGE'
            if (
              (colIndex === range.s.c && cellValue === 'UPC') ||
              (colIndex === range.s.c + 1 && cellValue === 'CC CHARGE') ||
              (colIndex === range.s.c + 1 &&
                (cellValue === null || cellValue === undefined || cellValue === ''))
            ) {
              isEmptyRow = true;
              break;
            }
  
            row.push(cellValue);
  
            // Check if it's one of the first 4 cells and has a value
            if (
              colIndex <= range.s.c + 2 &&
              (cellValue !== null && cellValue !== undefined && cellValue !== '')
            ) {
              isEmptyRow = false;
            }
          }
  
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
  

  const handleSubmit = async () => {
    if (selectedFile && excelData) {
      try {
        const batchSize = 10; // patch 10 rows at a time
        const totalRows = excelData.length;
  
        for (let start = 0; start < totalRows; start += batchSize) {
          const end = Math.min(start + batchSize, totalRows);
          const batch = excelData.slice(start, end);
  
          await Promise.all(batch.map(processRow));
        }
        console.log('File submitted:', selectedFile);
        alert('Excel Uploaded!');
        setExcelData(null);
        setSelectedFile(null);
      } catch (error) {
        console.error('Error during submission:', error);
      }
    } else {
      console.log('No file selected');
    }
  };
  
  const processRow = async (row) => {
    const productId = parseInt(row[0], 10);
    const quantityToSubtract = parseInt(row[3], 10);
  
    try {
      const response = await fetch(`${API_BASE_URL}/api/products/excel/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          id: productId,
          quantity: quantityToSubtract
        }),
      });
  
      if (!response.ok) {
        throw new Error(`Failed to update product ${productId}`);
      }
  
      console.log(`Product ${productId} updated successfully`);
    } catch (error) {
      console.error(`Error updating product ${productId}:`, error);
    }
  };
  

  return (
    <div>
      <h2>ExcelUploader</h2>
      <button className="backbutton" onClick={() => navigate(-1)}>
        {'<< Back'}
      </button>
      <br />
      <input
        type="file"
        onChange={handleFileChange}
        accept=".xls, .xlsx"
        className="excelsubmitter"
      />
      {excelData && (
        <div>
          <h3>Preview:</h3>
          <table className="excel-table">
            <thead>
              <tr>
                {excelData[0].map((cell, index) => (
                  index !== 5 && (
                    <th key={index} style={{ fontWeight: 'normal' }}>
                      {cell}
                    </th>
                  )
                ))}
              </tr>
            </thead>
            <tbody>
              {excelData.slice(1).map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    cellIndex !== 5 && (
                      <td key={cellIndex}>{cell}</td>
                    )
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <br />
      {excelData && (
        <button onClick={handleSubmit} className="logbutton">
          Submit
        </button>
      )}
      <div style={{marginBottom:'250px'}}></div>
    </div>
  );
};

export default ExcelUploader;
