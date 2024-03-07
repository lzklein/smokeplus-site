import React, {useState} from 'react'

const Tax = () => {
    // ! useState(backend tax number)
    const [originalTax, setOriginalTax] = useState(0);
    const [taxInput, setTaxInput]=useState(0);

  return (
    <div>
        <h1>Tax</h1>
        <h3>The current tax rate is: {originalTax}%</h3>
        <form>
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
            <button type='submit' style='backbutton'>Apply</button>
        </form>
    </div>
  )
}

export default Tax