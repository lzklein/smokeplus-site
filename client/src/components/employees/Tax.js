import React, { useState, useEffect } from 'react';

const Tax = () => {
  const [originalTax, setOriginalTax] = useState(0);
  const [taxInput, setTaxInput] = useState(0);

  useEffect(() => {
    const fetchTaxRate = async () => {
      try {
        const response = await fetch('/api/tax');
        const data = await response.json();
        setOriginalTax(data.taxRate);
      } catch (error) {
        console.error('Error fetching tax rate:', error.message);
      }
    };

    fetchTaxRate();
  }, []); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/tax', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ taxRate: taxInput }),
      });

      if (response.ok) {
        setOriginalTax(parseFloat(taxInput));
        setTaxInput(0);
      } else {
        console.error('Failed to update tax rate:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating tax rate:', error.message);
    }
  };

  return (
    <div>
      <h1>Tax</h1>
      <h3>The current tax rate is: {originalTax}%</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="New tax rate"
          onChange={(e) => {
            setTaxInput(e.target.value);
          }}
          value={taxInput}
          step="0.001"
          pattern="\d+(\.\d{1,3})?"
        />
        <button type="submit">Apply</button>
      </form>
    </div>
  );
};

export default Tax;
