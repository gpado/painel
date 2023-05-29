import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import CssBaseline from '@mui/material/CssBaseline';
import ConsultUsers from './pages/ConsultUsers';

const App = () => {
  return (
    <div>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/usuarios" element={<ConsultUsers />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
