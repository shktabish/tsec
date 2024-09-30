import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppLayout from './AppLayout';
import HomePage from './pages/HomePage';

function App() {
  return (
    <Router>
      <AppLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<div>Not Found</div>} />
        </Routes>
      </AppLayout>
    </Router>
  );
}

export default App;