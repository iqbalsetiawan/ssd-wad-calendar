export const saveEventsToStorage = (events) => {
  localStorage.setItem("calendarEvents", JSON.stringify(events));
};

export const getEventsFromStorage = () => {
  const storedEvents = localStorage.getItem("calendarEvents");
  return storedEvents ? JSON.parse(storedEvents) : {};
};
