const tConvert = (timeToConvert, type) => {
  if (type === "12hr") {
    // Check correct timeToConvert format and split into components
    timeToConvert = timeToConvert
      .toString()
      .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [timeToConvert];

    if (timeToConvert.length > 1) {
      // If timeToConvert format correct
      timeToConvert = timeToConvert.slice(1); // Remove full string match value
      timeToConvert[5] = +timeToConvert[0] < 12 ? " AM" : " PM"; // Set AM/PM
      timeToConvert[0] = +timeToConvert[0] % 12 || 12; // Adjust hours
    }
    return timeToConvert.join(""); // return adjusted time or original string
  } else if (type === "24hr") {
    const [time, modifier] = timeToConvert.split(" ");

    let [hours, minutes] = time.split(":");

    if (hours === "12") {
      hours = "00";
    }

    if (modifier === "PM") {
      hours = parseInt(hours, 10) + 12;
    }

    return `${hours}:${minutes}`;
  }
};

const weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
]; // Days of the week
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]; // Month names

export { tConvert, weekDays, months };
