import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import useStore from '../store/useStore';
import { DeleteCancelBtn, EditInputCSs, EditLabelCSs, UpdateScheduleBtn } from '../components/variables';

const INTERVIEW_TYPES = ['Technical', 'HR', 'Behavioral'];

export default function EditInterview() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { interviews, interviewers, updateInterview, deleteInterview, hasConflict } = useStore();
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const interview = interviews.find((i) => i.id === parseInt(id));
    if (!interview) {
      toast.error('Interview not found');
      navigate('/');
      return;
    }
    setFormData(interview);
  }, [id, interviews, navigate]);

  if (!formData) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (hasConflict(formData)) {
      toast.error('Interview time conflicts with existing schedule');
      return;
    }

    updateInterview(parseInt(id), formData);
    toast.success('Interview updated successfully');
    navigate('/');
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this interview?')) {
      deleteInterview(parseInt(id));
      toast.success('Interview deleted successfully');
      navigate('/');
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-6">Edit Interview</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className={EditLabelCSs}>Candidate Name</label>
          <input
            type="text"
            required
            className={EditInputCSs}

            value={formData.candidateName}
            onChange={(e) => setFormData({ ...formData, candidateName: e.target.value })}
          />
        </div>

        <div>
          <label className={EditLabelCSs}>Interviewer</label>
          <select
            required
            className={EditInputCSs}

            value={formData.interviewerId}
            onChange={(e) => setFormData({ ...formData, interviewerId: parseInt(e.target.value) })}
          >
            {interviewers.map((interviewer) => (
              <option key={interviewer.id} value={interviewer.id}>
                {interviewer.name} - {interviewer.role}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={EditLabelCSs}>Start Time</label>
            <input
              type="datetime-local"
              required
              className={EditInputCSs}

              value={formData.startTime}
              onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
            />
          </div>
          
          <div>
            <label className={EditLabelCSs}>End Time</label>
            <input
              type="datetime-local"
              required
              className={EditInputCSs}
              value={formData.endTime}
              onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
            />
          </div>
        </div>

        <div>
          <label className={EditLabelCSs}>Interview Type</label>
          <select
            required
            className={EditInputCSs}

            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          >
            {INTERVIEW_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={EditLabelCSs}>Notes</label>
          <textarea
                         className={EditInputCSs}

            rows="3"
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          ></textarea>
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={handleDelete}
            className={DeleteCancelBtn}
          >
            Delete Interview
          </button>
          
          <div className="space-x-4">
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
              Update Interview
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}