import React from 'react'
import CategoryCards from './CategoryCards';

const Categories = () => {
  return (
    <div>
      <h1>Shop By Category</h1>
      <div className='section'>
        <h3>Cigarettes</h3>
        <Link className="see-all-link" to={{pathname:'/category/more', state:{category:'Cigarettes'}}}>See More &raquo;</Link>
      </div>
      <CategoryCards category='Cigarettes'/>
      <div className='section'>
        <h3>Vapes</h3>
        <Link className="see-all-link" to={{pathname:'/category/more', state:{category:'Vapes'}}}>See More &raquo;</Link>
      </div>   
      <CategoryCards category='Vapes'/>
      <div className='section'>
        <h3>Tobacco</h3>
        <Link className="see-all-link" to={{pathname:'/category/more', state:{category:'Tobacco'}}}>See More &raquo;</Link>
      </div>    
      <CategoryCards category='Tobacco'/>
      <div className='section'>
        <h3>General Merchandise</h3>
        <Link className="see-all-link" to={{pathname:'/category/more', state:{category:'General Merchandise'}}}>See More &raquo;</Link>
      </div>
      <CategoryCards category='General Merchandise'/>
    </div>
  )
}

export default Categories