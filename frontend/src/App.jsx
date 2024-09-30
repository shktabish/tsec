import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppLayout from './AppLayout';
import HomePage from './pages/HomePage';
import MeetingSchedule from './pages/MeetingSchedule';
import StudentDashBoard from './pages/StudentDashBoard';

function App() {
  return (
    <Router>
      <AppLayout>
        <Routes>
          <Route path="/" element={<MeetingSchedule />} />
          <Route path="/student" element={<StudentDashBoard />} />
          <Route path="*" element={<div>Not Found</div>} />
        </Routes>
      </AppLayout>
    </Router>
  );
}

export default App;