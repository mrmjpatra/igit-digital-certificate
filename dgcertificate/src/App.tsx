import React from 'react';
import Home from './pages/Home/Home';
import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
