import React, { useState, useEffect } from 'react';

const Tax = () => {
  const [originalTax, setOriginalTax] = useState(0);
  const [taxInput, setTaxInput] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTaxRate = async () => {
      try {
        const response = await fetch('/api/tax');
        if (!response.ok) {
          throw new Error(`Failed to fetch tax rate: ${response.statusText}`);
        }
        
        const data = await response.json();
        setOriginalTax(data.taxRate);
      } catch (error) {
        console.error('Error fetching tax rate:', error.message);
        setError('Failed to fetch tax rate. Please try again.');
      }
    };

    fetchTaxRate();
  }, []);

  const applyTax = async () => {
    try {
      const response = await fetch('/api/tax', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ taxRate: taxInput }),
      });

      if (!response.ok) {
        throw new Error(`Failed to update tax rate: ${response.statusText}`);
      }

      const data = await response.json();
      setOriginalTax(data.taxRate);
    } catch (error) {
      console.error('Error updating tax rate:', error.message);
      setError('Failed to update tax rate. Please try again.');
    }
  };

  return (
    <div>
      <h1>Tax</h1>
      <h3>The current tax rate is: {originalTax}%</h3>
      <form>
        <input
          type="number"
          placeholder="New tax rate"
          onChange={(e) => setTaxInput(e.target.value)}
          value={taxInput}
          step="0.001"
          pattern="\d+(\.\d{1,3})?"
        />
        <button type="button" onClick={applyTax}>
          Apply
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Tax;
