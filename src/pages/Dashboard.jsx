import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment'; 
import { useNavigate } from 'react-router-dom';
import useStore from '../store/useStore';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { DashboardInputCSs, EditLabelCSs } from '../components/variables';

export default function Dashboard() {
  const { interviews, interviewers } = useStore();
  const navigate = useNavigate();
  const [filter, setFilter] = useState({
    date: '',
    interviewer: '',
  });

  const localizer = momentLocalizer(moment); 
  const filteredInterviews = interviews.filter((interview) => {
    if (filter.date && !interview.startTime.includes(filter.date)) return false;
    if (filter.interviewer && interview.interviewerId !== parseInt(filter.interviewer))
      return false;
    return true;
  });

  const events = filteredInterviews.map((interview) => ({
    id: interview.id,
    title: `${interview.candidateName} - ${interview.type}`,
    start: new Date(interview.startTime),
    end: new Date(interview.endTime),
  }));

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">Interview Dashboard</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className={EditLabelCSs}>Filter by Date</label>
            <input
              type="date"
              className={DashboardInputCSs}

              value={filter.date}
              onChange={(e) => setFilter({ ...filter, date: e.target.value })}
            />
          </div>
          <div>
            <label className={EditLabelCSs}>Filter by Interviewer</label>
            <select
              className={DashboardInputCSs}
              value={filter.interviewer}
              onChange={(e) => setFilter({ ...filter, interviewer: e.target.value })}
            >
              <option value="">All Interviewers</option>
              {interviewers.map((interviewer) => (
                <option key={interviewer.id} value={interviewer.id}>
                  {interviewer.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="h-[600px]">
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            onSelectEvent={(event) => navigate(`/edit/${event.id}`)}
            style={{ height: '100%' }}
          />
        </div>
      </div>
    </div>
  );
}
