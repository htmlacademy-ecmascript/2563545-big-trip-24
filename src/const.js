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
//add/edit-points-view.js
const POINT_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

//filter.js
const FilterType = {
  EVERYTHING: 'everything',
  PAST: 'past',
  FUTURE: 'future',
  PRESENT: 'present',
};

const SortType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFER: 'offer'
};

const Mode = {
  DEFAULT: 'DEFAULT',
  EDIT: 'EDIT'
};

export {COUNT_TRIP_EVENTS, HOURS_PER_DAY, dateFormats, MILLISECONDS_IN_MINUTES, POINT_TYPES, FilterType, SortType, Mode};


