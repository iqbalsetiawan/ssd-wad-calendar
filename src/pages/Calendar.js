import React, { useState, useEffect } from "react";

import Day from "./Day";

import { weekDays, months } from "../utils/time";
import { getEventsFromStorage, saveEventsToStorage } from "../utils/storage";

const Calendar = () => {
  const [selectedMonth] = useState(new Date());
  const [events, setEvents] = useState(getEventsFromStorage());

  const monthName = months[selectedMonth.getMonth()];
  const year = selectedMonth.getFullYear();

  const handleAddEvent = (date, eventDetails) => {
    setEvents((prevEvents) => ({
      ...prevEvents,
      [date.toISOString()]: [
        ...(prevEvents[date.toISOString()] || []),
        eventDetails,
      ],
    }));
  };

  const handleEditEvent = (day, editedEvent) => {
    setEvents((prevEvents) => {
      const updatedEvents = { ...prevEvents };
      const eventIndex = updatedEvents[day.toISOString()].findIndex(
        (event) => event.id === editedEvent.id,
      );
      if (eventIndex !== -1) {
        updatedEvents[day.toISOString()][eventIndex] = editedEvent;
      }
      return updatedEvents;
    });
  };

  const handleDeleteEvent = (day, eventId) => {
    setEvents((prevEvents) => {
      const updatedEvents = { ...prevEvents };
      updatedEvents[day.toISOString()] = updatedEvents[
        day.toISOString()
      ].filter((event) => event.id !== eventId);
      return updatedEvents;
    });
  };

  const firstDayOfMonth = new Date(
    selectedMonth.getFullYear(),
    selectedMonth.getMonth(),
    1,
  );
  const dayOfWeek = firstDayOfMonth.getDay(); // Mendapatkan hari dalam bentuk angka (0 = Minggu, 1 = Senin, dst.)

  // Geser hari pertama kalender ke hari Minggu (index 0)
  firstDayOfMonth.setDate(firstDayOfMonth.getDate() - dayOfWeek);

  const lastDayOfMonth = new Date(
    selectedMonth.getFullYear(),
    selectedMonth.getMonth() + 1,
    0,
  );
  const daysInMonth = [];

  for (
    let day = new Date(firstDayOfMonth);
    day <= lastDayOfMonth;
    day.setDate(day.getDate() + 1)
  ) {
    daysInMonth.push(new Date(day));
  }

  useEffect(() => {
    saveEventsToStorage(events);
  }, [events]);

  return (
    <div className="calendar">
      <div className="month-year">
        {monthName} {year}
      </div>
      <div className="calendar-header">
        {weekDays.map((day) => (
          <div key={day} className="week-day">
            {day}
          </div>
        ))}
      </div>
      <div className="calendar-days">
        {daysInMonth.map((day) => (
          <Day
            key={day.toISOString()}
            day={day}
            events={events[day.toISOString()] || []}
            onAddEvent={handleAddEvent}
            onEditEvent={handleEditEvent}
            onDeleteEvent={handleDeleteEvent}
            isSameMonth={day.getMonth() === selectedMonth.getMonth()}
          />
        ))}
      </div>
    </div>
  );
};

export default Calendar;
