
import React from 'react'
import { Link } from 'react-router-dom'
import ImDB from "../img/imdb.png"

export const Header: React.FC = () => {
  return (
    <div>
    <header>
        <nav className='navbar navbar-expand-md navbar-dark bg-dark'>
            <div className='container'>
            <Link to='/movies' className='navbar-brand'>
              <img src={ImDB} alt='Icon' style={{ width: '50px', marginLeft: '-30%' }} />
            </Link>
                <div className='collapse navbar-collapse' id='navbarNav'>
                    <ul className='navbar-nav ms-auto'>
                        <li className='nav-item'>
                            <Link to="/addmovie" className='btn btn-primary mb-2'>Add Movie</Link>
                        </li>
                        <li className='nav-item'>
                    <Link to='/login' className='nav-link'>
                        Login
                    </Link>
                    </li>
                    <li className='nav-item'>
                    <Link to='/register' className='nav-link'>
                        Register
                    </Link>
                    </li>
                    <li className='nav-item'>
                    <Link to='/contact' className='nav-link'>
                        Logout
                    </Link>
                    </li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>
    </div>
  )
}
