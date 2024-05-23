import ReactGA from 'react-ga';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import About from './pages/AuthenticatedPages/About/About';
import CertificateDownload from './pages/AuthenticatedPages/Apply-Download/CertificateDownload';
import MarksheetDownload from './pages/AuthenticatedPages/Apply-Download/MarksheetDownload';
import StepsToDownload from './pages/AuthenticatedPages/Apply-Download/StepsToDownload';
import ProtectedHome from './pages/AuthenticatedPages/Home/Home';
import MainContent from './pages/AuthenticatedPages/Home/MainContent';
import IssuedDocument from './pages/AuthenticatedPages/IssuedDocuments';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Print from './pages/Print';
import Register from './pages/Register/Register';
import ProtectedRoute from './utils/ProtectedRoute';
import RouteChangeTracker from './analytics/RouterChangeTracker';

const queryClient = new QueryClient();
const TRACKING_ID = "G-7WRR063DJ6";
ReactGA.initialize(TRACKING_ID);
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <RouteChangeTracker/>
            <Route element={<ProtectedRoute />}>
              <Route path='/home' element={<ProtectedHome />}>
                <Route path='' element={<MainContent />} />
                <Route path='documents' element={<MainContent />} />
                <Route path='search' element={<IssuedDocument />} />
                <Route path='certificate' element={<CertificateDownload />}>
                </Route>
                <Route path='pending' element={<StepsToDownload />} />
                <Route path='marksheet' element={<MarksheetDownload />} />
                <Route path='about' element={<About />} />
              </Route>
            </Route>
            <Route path='/printfile' element={<Print/>}/>
            <Route path='/' element={<Home />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </BrowserRouter>
      </div>
    </QueryClientProvider>
  );
}

export default App;
