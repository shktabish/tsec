import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppLayout from './AppLayout'; // This should contain <Outlet /> for nested routes
import HomePage from './pages/HomePage';
import MeetingSchedule from './pages/MeetingSchedule';
import StudentDashBoard from './pages/StudentDashBoard';
import ChatPage from './pages/ChatPage';
import ForumPage from './pages/ForumPage';
import ForumPost from './pages/Post';
import MentorsPage from './pages/MentorsPage';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  return (
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Nested Routes inside AppLayout */}
          <Route path="/" element={<AppLayout />}>
            <Route path="/mentor" element={<MeetingSchedule />} />
            <Route path="/student" element={<StudentDashBoard />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/forum" element={<ForumPage />} />
            <Route path="/forum-post" element={<ForumPost />} />
            <Route path="/mentors" element={<MentorsPage />} />
            <Route path="*" element={<div>Not Found</div>} />
          </Route>
        </Routes>
      </Router>
  );
}

export default App;
