// Консстанты
const COUNT_TRIP_EVENTS = 5;                    //используется в model-points.js
const HOURS_PER_DAY = 24;                       // utils.js
const MILLISECONDS_IN_MINUTES = 3600000;        // utils.js
const POINT_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant']; //add/edit points.js

const dateFormats = {                           // utils.js
    fullDateTime: 'YYYY-MM-DDTHH:mm',
    yearMonthDay: 'YYYY-MM-DD',
    monthDay: 'MMM D',
    hoursMinutes: 'HH:mm',
    fullDateIncompleteYear: 'YY/MM/DD HH:mm',
  };

export {COUNT_TRIP_EVENTS, HOURS_PER_DAY, dateFormats, MILLISECONDS_IN_MINUTES, POINT_TYPES};
