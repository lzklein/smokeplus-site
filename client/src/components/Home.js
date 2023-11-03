import React from 'react'
import Deals from './Deals'
import Popular from './Popular'

const home = () => {
  return (
    <div>
      {/* Banner/Promo thing here */}
      <h3>Deals!</h3>
      <Deals/>
      <h3>Popular</h3>
      <Popular/>
    </div>
  )
}

export default home