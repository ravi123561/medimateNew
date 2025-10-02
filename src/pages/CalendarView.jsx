import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
// import './CalendarView.css'; // 👈 optional for custom styles

export default function CalendarView() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [calendarData, setCalendarData] = useState({});

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('calendarData');
    if (stored) {
      setCalendarData(JSON.parse(stored));
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('calendarData', JSON.stringify(calendarData));
  }, [calendarData]);

  const formatDate = (date) => date.toISOString().split('T')[0];

  const handleMarkStatus = (status) => {
    const dateKey = formatDate(selectedDate);
    const updated = {
      ...calendarData,
      [dateKey]: [{ name: 'Medicine Name', status }],
    };
    setCalendarData(updated);
  };

  const getTileClassName = ({ date, view }) => {
    const key = formatDate(date);
    if (view === 'month' && calendarData[key]) {
      const allTaken = calendarData[key].every((m) => m.status === 'Taken');
      return allTaken ? 'bg-success text-white' : 'bg-danger text-white';
    }
    return '';
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h3 className="text-center mb-4">📅 Medicine Calendar</h3>

        <div className="d-flex justify-content-center">
          <Calendar
            onClickDay={(value) => setSelectedDate(value)}
            tileClassName={getTileClassName}
            value={selectedDate}
          />
        </div>

        <div className="text-center mt-4">
          <h5>Selected Date: {formatDate(selectedDate)}</h5>
          <button
            className="btn btn-success me-2 mt-2"
            onClick={() => handleMarkStatus('Taken')}
          >
            ✅ Mark as Taken
          </button>
          <button
            className="btn btn-danger mt-2"
            onClick={() => handleMarkStatus('Missed')}
          >
            ❌ Mark as Missed
          </button>

          {calendarData[formatDate(selectedDate)] && (
            <div className="mt-3">
              <h6>
                Status: {calendarData[formatDate(selectedDate)][0].status}
              </h6>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
