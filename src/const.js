// Консстанты
//используется в model-points.js
const COUNT_TRIP_EVENTS = 5;
// utils.js
const HOURS_PER_DAY = 24;                       
const MILLISECONDS_IN_MINUTES = 3600000;
const dateFormats = {
  fullDateTime: 'YYYY-MM-DDTHH:mm',
  yearMonthDay: 'YYYY-MM-DD',
  monthDay: 'MMM D',
  hoursMinutes: 'HH:mm',
  fullDateIncompleteYear: 'YY/MM/DD HH:mm',
};
//add/edit points.js
const POINT_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

export {COUNT_TRIP_EVENTS, HOURS_PER_DAY, dateFormats, MILLISECONDS_IN_MINUTES, POINT_TYPES};
