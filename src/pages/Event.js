import React from "react";

const Event = ({ event, onEditEvent, onDeleteEvent }) => {
  const { id, name, time, invitees, color } = event;

  const handleEdit = () => {
    onEditEvent(id);
  };

  const handleDelete = () => {
    onDeleteEvent(id);
  };

  return (
    <div className="event" style={{ backgroundColor: color }}>
      <div className="event-info">
        <div className="event-name">{name}</div>
        <div className="event-invitees">{invitees.join(", ")}</div>
        <div className="event-time">{time}</div>
      </div>
      <div className="event-controls">
        <i onClick={handleEdit} className="fa fa-pencil-square white-color" />
        <i onClick={handleDelete} className="fa fa-trash white-color" />
      </div>
    </div>
  );
};

export default Event;
