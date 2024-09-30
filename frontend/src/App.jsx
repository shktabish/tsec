import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppLayout from './AppLayout';
import HomePage from './pages/HomePage';
import MeetingSchedule from './pages/MeetingSchedule';
import StudentDashBoard from './pages/StudentDashBoard';
import ChatPage from './pages/ChatPage';
import ForumPage from './pages/ForumPage';
import ForumPost from './pages/Post';
import MentorsPage from './pages/MentorsPage';

function App() {
  return (
    <Router>
      <AppLayout>
        <Routes>
          <Route path="/" element={<MeetingSchedule />} />
          <Route path="/student" element={<StudentDashBoard />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/forum" element={<ForumPage />} />
          <Route path="/forum-post" element={<ForumPost />} />
          <Route path="/mentors" element={<MentorsPage />} />
          <Route path="*" element={<div>Not Found</div>} />
        </Routes>
      </AppLayout>
    </Router>
  );
}

export default App;