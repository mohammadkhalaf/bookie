import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/landingpage/LandingPage';
import Homepage from './pages/Home/Homepage';
import Error from './pages/Error/Error';

import './App.css';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/home' element={<Homepage />} />
          <Route path='*' element={<Error />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
