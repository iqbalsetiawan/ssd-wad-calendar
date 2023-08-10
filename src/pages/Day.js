import React, { useState } from "react";

import Event from "./Event";

import Modal from "../components/Modal";

import { tConvert } from "../utils/time";
import { generateRandomColor } from "../utils/color";

const Day = ({
  day,
  events,
  onAddEvent,
  onEditEvent,
  onDeleteEvent,
  isSameMonth,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventName, setEventName] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [eventInvitees, setEventInvitees] = useState("");
  const [editingEventId, setEditingEventId] = useState(null);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleEditEvent = (eventId) => {
    const eventToEdit = events.find((event) => event.id === eventId);
    if (eventToEdit) {
      setEditingEventId(eventId);
      setEventName(eventToEdit.name);
      setEventTime(tConvert(eventToEdit.time, "24hr"));
      setEventInvitees(eventToEdit.invitees.join(", "));
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingEventId(null);
    setEventName("");
    setEventTime("");
    setEventInvitees("");
  };

  const handleModalSubmit = () => {
    if (eventName && eventTime && eventInvitees) {
      const newEvent = {
        id: editingEventId || Date.now(),
        name: eventName,
        invitees: eventInvitees.split(",").map((invitee) => invitee.trim()),
        time: tConvert(eventTime, "12hr"),
        color: editingEventId
          ? events.find((event) => event.id === editingEventId).color
          : generateRandomColor(),
      };
      if (editingEventId) {
        onEditEvent(day, newEvent);
      } else {
        onAddEvent(day, newEvent);
      }
      closeModal();
    }
  };

  const handleDeleteEvent = (eventId) => {
    onDeleteEvent(day, eventId);
  };

  return (
    <div
      className="calendar-day"
      style={{ visibility: isSameMonth ? "" : "hidden" }}
    >
      <div className="day-number">{day.getDate()}</div>
      <div className="events-container">
        {events.map((event) => (
          <Event
            key={event.id}
            event={event}
            onEditEvent={handleEditEvent}
            onDeleteEvent={handleDeleteEvent}
          />
        ))}
      </div>
      {events.length < 3 && (
        <button className="add-event-button" onClick={handleOpenModal}>
          Add Event
        </button>
      )}

      {/* Custom Modal */}
      <Modal isOpen={isModalOpen} onRequestClose={closeModal}>
        <h2>{editingEventId ? "Edit Event" : "Add Event"}</h2>
        <input
          type="text"
          placeholder="Event Name"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Event Invitees (comma-separated)"
          value={eventInvitees}
          onChange={(e) => setEventInvitees(e.target.value)}
        />
        <input
          type="time"
          placeholder="Event Time"
          value={eventTime}
          onChange={(e) => setEventTime(e.target.value)}
        />
        <div>
          <button onClick={handleModalSubmit}>
            {editingEventId ? "Save" : "Add"}
          </button>
          <button onClick={closeModal}>Cancel</button>
        </div>
      </Modal>
    </div>
  );
};

export default Day;
