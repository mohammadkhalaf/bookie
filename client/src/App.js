import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/landingpage/LandingPage';

import Error from './pages/Error/Error';

import './App.css';
import Bookstats from './pages/dashboard/bookstats/Bookstats';
import AddBook from './pages/dashboard/addbook/AddBook';
import IamReading from './pages/dashboard/IamReading/IamReading';
import AllBooks from './pages/dashboard/AllBooks/AllBooks';
import Profile from './pages/dashboard/Profile/Profile';
import Layout from './pages/dashboard/Layout/Layout';
import ProtectedRoute from './pages/ProtectedRoute';
import Register from './components/Register/Register';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route
            path='/dashboard'
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<IamReading />} />
            <Route path='stats' element={<Bookstats />} />
            <Route path='allbooks' element={<AllBooks />} />
            <Route path='addbook' element={<AddBook />} />
            <Route path='profile' element={<Profile />} />
          </Route>
          <Route path='/' element={<LandingPage />} />
          <Route path='/register' element={<Register />} />

          <Route path='*' element={<Error />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
