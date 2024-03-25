import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './pages/Home';
import { BrowserRouter, Navigate, Route,Routes } from 'react-router-dom';
import {Header}  from './component/Header';
import AddMovie from './component/AddMovie';
import Update from './component/Update';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Header/>
      <div className='container'>
        <Routes>
          <Route path='/movies' Component={Home}></Route>
          <Route path="*" element={<Navigate to="/movies" replace />} />
          <Route path='/addmovie' Component={AddMovie}></Route>
          <Route path='/update/:id' Component={Update}></Route>
        </Routes>
      </div>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
