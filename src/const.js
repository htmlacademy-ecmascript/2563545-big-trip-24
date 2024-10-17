// Консстанты
//используется в model-points.js
const COUNT_TRIP_EVENTS = 5;
// utils.js
const HOURS_PER_DAY = 24;
const MILLISECONDS_IN_MINUTES = 3600000;
const DATE_WITH_TIME_FORMAT = 'DD/MM/YY HH:mm';
const DATE_FORMAT = 'D MMM';
const TIME_FORMAT = 'HH:mm';

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

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

const ListEmptyText = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.PAST]: 'There are no past events now',
  [FilterType.PRESENT]: 'There are no present events now',
  [FilterType.FUTURE]: 'There are no future events now',
};

const BLANK_POINT = {
  type: POINT_TYPES[5],
  destination: null,
  dateFrom: null,
  dateTo: null,
  basePrice: 0,
  offers: [],
  isFavorite: false,
};

const Method = {
  GET: 'GET',
  PUT: 'PUT',
};

const URL = {
  POINTS: 'points',
  DESTINATIONS: 'destinations',
  OFFERS: 'offers',
};

export {dateFormats, COUNT_TRIP_EVENTS, HOURS_PER_DAY, DATE_WITH_TIME_FORMAT, DATE_FORMAT, MILLISECONDS_IN_MINUTES, TIME_FORMAT, POINT_TYPES, FilterType, SortType, Mode, UserAction, UpdateType, ListEmptyText, BLANK_POINT, Method, URL};


