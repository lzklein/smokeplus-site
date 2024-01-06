import React from 'react'
import CategoryCards from './CategoryCards';
import { Link } from 'react-router-dom';

const Categories = () => {
  return (
    <div>
      <h1 style={{marginTop:'40px', marginBottom:'40px'}}>Shop By Category</h1>
      <div className='section'>
        <h2>Cigarettes</h2>
        <Link className="see-all-link" to={{pathname:'/category/more', state:{category:'Cigarettes'}}}>See More &raquo;</Link>
      </div>
      <CategoryCards category='Cigarettes'/>
      <div className='section'>
        <h2>Vapes</h2>
        <Link className="see-all-link" to={{pathname:'/category/more', state:{category:'Vapes'}}}>See More &raquo;</Link>
      </div>   
      <CategoryCards category='Vapes'/>
      <div className='section'>
        <h2>Tobacco</h2>
        <Link className="see-all-link" to={{pathname:'/category/more', state:{category:'Tobacco'}}}>See More &raquo;</Link>
      </div>    
      <CategoryCards category='Tobacco'/>
      <div className='section'>
        <h2>General Merchandise</h2>
        <Link className="see-all-link" to={{pathname:'/category/more', state:{category:'General Merchandise'}}}>See More &raquo;</Link>
      </div>
      <CategoryCards category='General Merchandise'/>
    </div>
  )
}

export default Categories