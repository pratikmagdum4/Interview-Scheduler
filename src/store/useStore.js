import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useStore = create(

  
  persist(
    (set) => ({
      interviews: [],
      interviewers: [
        { id: 1, name: 'Sundar pichae', role: 'Technical Lead' },
        { id: 2, name: 'Jeff Bejos', role: 'HR Manager' },
        { id: 3, name: 'Elon Musk', role: 'Senior Developer' },
      ],
      addInterview: (interview) =>
        set((state) => ({
          interviews: [...state.interviews, { ...interview, id: Date.now() }],
        })),
      updateInterview: (id, updatedInterview) =>
        set((state) => ({
          interviews: state.interviews.map((interview) =>
            interview.id === id ? { ...interview, ...updatedInterview } : interview
          ),
        })),
      deleteInterview: (id) =>
        set((state) => ({
          interviews: state.interviews.filter((interview) => interview.id !== id),
        })),
      hasConflict: (newInterview) => {
        const state = useStore.getState();
        return state.interviews.some((interview) => {
          if (interview.id === newInterview.id) return false;
          const newStart = new Date(newInterview.startTime);
          const newEnd = new Date(newInterview.endTime);
          const existingStart = new Date(interview.startTime);
          const existingEnd = new Date(interview.endTime);
          
          return (
            newInterview.interviewerId === interview.interviewerId &&
            ((newStart >= existingStart && newStart < existingEnd) ||
              (newEnd > existingStart && newEnd <= existingEnd) ||
              (newStart <= existingStart && newEnd >= existingEnd))
          );
        });
      },
    }),
    {
      name: 'interview-scheduler',
    }
  )
);

export default useStore;