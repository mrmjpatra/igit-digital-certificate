import React from 'react';
import Home from './pages/Home/Home';
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import ProtectedRoute from './utils/ProtectedRoute';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoute />}>
              <Route path='/' element={<Home/>}/>
          </Route>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
