import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/ui/Navbar.jsx';
import Dashboard from './pages/Dashboard';
import ScheduleInterview from './pages/ScheduleInterview';
import EditInterview from './pages/EditInterview';
import LoginPage from './pages/Login.jsx'


function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/schedule" element={<ScheduleInterview />} />
            <Route path="/edit/:id" element={<EditInterview />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </main>
        <Toaster position="top-right" />
      </div>
    </Router>
  );
}


export default App;