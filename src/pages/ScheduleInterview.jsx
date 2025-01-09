import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import useStore from '../store/useStore';
import emailjs from 'emailjs-com';
import { DeleteCancelBtn, ScheduleInterviewInputCSs, ScheduleLabelCSs, UpdateScheduleBtn } from '../components/variables';

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
   
    emailjs.send(serviceID, templateID, formData, userID)
        .then((response) => {
            console.log("response ", response)
            console.log('SUCCESS!', response.status, response.text);
            setSubmitted(true);
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
          <label className={ScheduleLabelCSs}>Candidate Name</label>
          <input
            type="text"
            required
            className={ScheduleInterviewInputCSs}

            value={formData.candidateName}
            onChange={(e) => setFormData({ ...formData, candidateName: e.target.value })}
          />
        </div>

        <div>
          <label className={ScheduleLabelCSs}>Interviewer</label>
          <select
            required
            className={ScheduleInterviewInputCSs}

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
            <label className={ScheduleLabelCSs}>Start Time</label>
            <input
              type="datetime-local"
              required
              className={ScheduleInterviewInputCSs}

              value={formData.startTime}
              onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
            />
          </div>
          
          <div>
            <label className={ScheduleLabelCSs}>End Time</label>
            <input
              type="datetime-local"
              required
              className={ScheduleInterviewInputCSs}

              value={formData.endTime}
              onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
            />
          </div>
        </div>

        <div>
          <label className={ScheduleLabelCSs}>Interview Type</label>
          <select
            required
            className={ScheduleInterviewInputCSs}
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
          <label className={ScheduleLabelCSs}>Notes</label>
          <textarea
                        className={ScheduleInterviewInputCSs}

            rows="3"
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          ></textarea>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/')}
                         className={DeleteCancelBtn}
          >
            Cancel
          </button>
          <button
            type="submit"
            className={UpdateScheduleBtn}
          >
            Schedule Interview
          </button>
        </div>
      </form>
    </div>
  );
}