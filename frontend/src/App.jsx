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
import { UserProvider } from './context/UserContext';
import Room from './utils/Room';
import RoadmapPage from './pages/RoadmapPage';
import Quiz from './pages/Quiz';
import Scholarship from './pages/Scholarship';
import OnboardingForm from './pages/OnboardingForm'
import Chatbot from './pages/Chatbot';

function App() {
  return (
    <UserProvider>
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
            <Route path="/student/mentors" element={<MentorsPage />} />
            <Route path="/scholarship" element={<Scholarship />} />
            <Route path="/chatbot" element={<Chatbot />} />
            <Route path="/roadmap" element={<RoadmapPage />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="*" element={<div>Not Found</div>} />
          </Route>
          <Route path="/student/onboarding" element={<OnboardingForm />} />
          <Route path="/:roomId" element={<Room />} />

        </Routes>
      </Router>
    </UserProvider>
     
  );
}

export default App;
