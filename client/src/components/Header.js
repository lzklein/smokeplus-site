import React, { useState, useEffect, useContext, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import NavLeft from './NavLeft';
import NavRight from './NavRight';
import { SessionContext } from '../App';

const Header = () => {
  const { API_BASE_URL, cart, isMobile, isModal } = useContext(SessionContext);
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const [openCategory, setOpenCategory] = useState('');
  const [openSubcategory, setOpenSubcategory] = useState('');
  const [categoriesData, setCategoriesData] = useState([]);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !event.target.classList.contains('menuToggle')
      ) {
        closeBurgerMenu();
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/products/hamburger/category`);
        const data = await response.json();
        console.log(data)
        setCategoriesData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleBurger = () => {
    setIsOpen(!isOpen);
    setHidden(!hidden);
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    setIsOpen(false);
    setHidden(true);
  }, [location.pathname]);

  const handleCategory = (input) => {
    if (input === openCategory) {
      setOpenCategory('');
    } else {
      setOpenCategory(input);
    }
  };

  const handleSubcategory = (input) => {
    if (input === openSubcategory) {
      setOpenSubcategory('');
    } else {
      setOpenSubcategory(input);
    }
  };

  const closeBurgerMenu = () => {
    setIsOpen(false);
    setHidden(true);
    setIsMenuOpen(false);
  };

  useEffect(() => {
    closeBurgerMenu();
  }, [location.pathname]);

  const renderCategories = () => {
    return categoriesData.map((category, index) => (
      <div key={category.category} className="category-container">
        <li
          className={index === 0 ? 'first-li' : 'other-li'}
          onClick={() => handleCategory(category.category)}
        >
          {openCategory === category.category ? '▼ ' : '▶ '} {category.category}
          <Link
            to={`/category/more/${category.category}`}
            onClick={() => setIsMenuOpen(false)}
            className="category-link"
          >
            &raquo;
          </Link>
        </li>
        {openCategory === category.category ? renderSubcategories(category) : null}
      </div>
    ));
  };
  
  const renderSubcategories = (category) => {
    return category.subcategories.map((subcategory) => (
      <div key={subcategory.subcategory} className='subcategory-container'>
        <li onClick={() => handleSubcategory(subcategory.subcategory)}>
          {openSubcategory === subcategory.subcategory ? '▼ ' : '▶ '} {subcategory.subcategory}
          <Link
            to={`/subcategory/more/${subcategory.subcategory}`}
            onClick={() => setIsMenuOpen(false)}
            className="category-link"
          >
            &raquo;
          </Link>
        </li>
        {openSubcategory === subcategory.subcategory ? renderBrands(subcategory) : null}
      </div>
    ));
  };

  const renderBrands = (subcategory) => {
    return subcategory.brands.map((brand) => (
      <div key={brand} className='brand-container'>
        <li>
          <Link to={`/brand/more/${brand}`} onClick={() => setIsMenuOpen(false)} className="category-link">
            {' '}
            {brand} &raquo;
          </Link>
        </li>
      </div>
    ));
  };

  if (isMobile) {
    return (
      <header className="header" style={{ userSelect: 'none' }}>
        <div className="left-nav">
          <div className={`hamburger-container ${isOpen ? 'open' : ''}`} onClick={handleBurger}>
            <div className="hamburger-line"></div>
            <div className="hamburger-line"></div>
            <div className="hamburger-line"></div>
          </div>
          <Link to="/" style={{ marginLeft: '50px', fontSize: '30px', fontWeight: '500' }}>
            SMOKE PLUS
          </Link>
        </div>
        {!hidden && (
          <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
            <Link
              to="/all"
              className="hamburger-link"
              style={{ marginRight: '100px', fontSize: '20px', fontWeight: '500' }}
            >
              All Products
            </Link>
            <Link
              to="/categories"
              className="hamburger-link"
              style={{ marginRight: '100px', fontSize: '20px', fontWeight: '500' }}
            >
              Top Categories
            </Link>
            <Link
              to="/order"
              className="hamburger-link"
              style={{ marginRight: '100px', fontSize: '20px', fontWeight: '500' }}
            >
              Order Status
            </Link>
          </div>
        )}

        <div className="right-nav" style={{ userSelect: 'none' }}>
          <NavRight cart={cart} />
        </div>
      </header>
    );
  }

  return (
    <header className="header" style={{ userSelect: 'none' }}>
      <div className="left-nav">
        <nav role="navigation">
          {
            isModal? null:          
            <div id="menuToggle">
              <input type="checkbox" checked={isMenuOpen} onClick={handleBurger} className="menuToggle" readOnly/>

              <span onClick={handleBurger} className="menuToggle"></span>
              <span onClick={handleBurger} className="menuToggle"></span>
              <span onClick={handleBurger} className="menuToggle"></span>

              <ul id="menu" className={isMenuOpen ? 'isMenuOpen' : ''} ref={menuRef}>
                {renderCategories()}
              </ul>
            </div>
          }

        </nav>
        <NavLeft />
      </div>

      <div className={`right-nav ${isMenuOpen ? 'isMenuOpen' : ''}`} style={{ userSelect: 'none' }}>
        <NavRight cart={cart} />
      </div>
    </header>
  );
};

export default Header;
