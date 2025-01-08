import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import useStore from '../store/useStore';
import emailjs from 'emailjs-com';

const INTERVIEW_TYPES = ['Technical', 'HR', 'Behavioral'];

export default function ScheduleInterview() {
  const navigate = useNavigate();
  const { addInterview, interviewers, hasConflict } = useStore();
  const [formData, setFormData] = useState({
    candidateName: '',
    interviewerId: '',
    startTime: '',
    endTime: '',
    type: '',
    notes: '',
  });
  const handleEmailNotification = (e) =>{

    const serviceID = import.meta.env.VITE_EMAIL_SERVICE_ID;
    const templateID = import.meta.env.VITE_EMAIL_TEMPLATE_ID;
    const userID = import.meta.env.VITE_EMAIL_USER_ID;
    console.log("THe formdata is ", formData)
    // Send email via EmailJS
    emailjs.send(serviceID, templateID, formData, userID)
        .then((response) => {
            console.log("response ", response)
            console.log('SUCCESS!', response.status, response.text);
            setSubmitted(true); // Show success message
        })
        .catch((err) => {
            console.error('FAILED...', err);
            setError('Failed to send message. Please try again.');
        });

  }
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (hasConflict(formData)) {
      toast.error('Interview time conflicts with existing schedule');
      return;
    }

    addInterview(formData);
    toast.success('Interview scheduled successfully');
    navigate('/');
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-6">Schedule New Interview</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Candidate Name</label>
          <input
            type="text"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={formData.candidateName}
            onChange={(e) => setFormData({ ...formData, candidateName: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Interviewer</label>
          <select
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={formData.interviewerId}
            onChange={(e) => setFormData({ ...formData, interviewerId: parseInt(e.target.value) })}
          >
            <option value="">Select Interviewer</option>
            {interviewers.map((interviewer) => (
              <option key={interviewer.id} value={interviewer.id}>
                {interviewer.name} - {interviewer.role}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Start Time</label>
            <input
              type="datetime-local"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={formData.startTime}
              onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">End Time</label>
            <input
              type="datetime-local"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={formData.endTime}
              onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Interview Type</label>
          <select
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          >
            <option value="">Select Type</option>
            {INTERVIEW_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Notes</label>
          <textarea
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            rows="3"
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          ></textarea>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
          >
            Schedule Interview
          </button>
        </div>
      </form>
    </div>
  );
}