import React from 'react';
import Home from './pages/Home/Home';
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import ProtectedRoute from './utils/ProtectedRoute';
import ProtectedHome  from './pages/AuthenticatedPages/Home/Home';
import MainContent from './pages/AuthenticatedPages/Home/MainContent';
import IssuedDocument from './pages/AuthenticatedPages/IssuedDocuments';
import CertificateDownload from './pages/AuthenticatedPages/Apply-Download/CertificateDownload';
import MarksheetDownload from './pages/AuthenticatedPages/Apply-Download/MarksheetDownload';
import StepsToDownload from './pages/AuthenticatedPages/Apply-Download/StepsToDownload';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoute />}>
              <Route path='/home' element={<ProtectedHome/>}>
                  <Route path='' element={<MainContent/>}/>
                  <Route path='documents' element={<MainContent/>}/>
                  <Route path='search' element={<IssuedDocument/>}/>
                  <Route path='certificate' element={<CertificateDownload/>}>
                  </Route>
                  <Route path='pending' element={<StepsToDownload/> }/>
                  <Route path='marksheet' element={<MarksheetDownload/>}/>
              </Route>
          </Route>
          <Route path='/' element={<Home/>}/>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
