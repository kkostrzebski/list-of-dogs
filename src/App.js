import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import BreedList from './components/List/BreedList';
import BreedSearch from './components/Search/BreedSearch';
import '../src/App.css';
import { FaDog, FaSearch } from 'react-icons/fa';

const App = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    // Efekt używany do obsługi scrollowania strony i zmiany flagi isScrolled
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Efekt używany do obsługi zmiany szerokości okna i aktualizacji wartości windowWidth
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Dodanie nasłuchiwania zdarzeń scroll i resize
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    // Czyszczenie nasłuchiwania zdarzeń po zakończeniu komponentu
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const shouldDisplayIcons = windowWidth < 568;

  return (
    <Router>
      <div className='content'>
        {/* Nawigacja */}
        <nav className={`nav-container ${isScrolled ? 'scrolled' : ''}`}>
          <ul className='nav-links'>
            <li>
              {/* Link do listy ras psów */}
              <NavLink exact to='/' activeClassName='active'>
                {shouldDisplayIcons ? <FaDog /> : 'Lista ras'}
              </NavLink>
            </li>
            <li>
              {/* Link do wyszukiwania rasy psa */}
              <NavLink to='/search' activeClassName='active'>
                {shouldDisplayIcons ? <FaSearch /> : 'Wyszukiwanie rasy'}
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Definicja tras */}
        <Routes>
          <Route path='/' element={<BreedList />} />
          <Route path='/search' element={<BreedSearch />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;