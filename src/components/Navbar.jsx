import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Plus } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Calendar className="h-6 w-6 text-indigo-600" />
            <span className="font-semibold text-xl">Interview Scheduler</span>
          </Link>
          <Link
            to="/schedule"
            className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            <Plus className="h-5 w-5 mr-1" />
            Schedule Interview
          </Link>
        </div>
      </div>
    </nav>
  );
}