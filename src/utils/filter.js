import dayjs from 'dayjs';
import {FilterType} from '../const';

const isFutureFilter = (date) => {
  const currDate = dayjs();
  const targetDate = dayjs(date);

  return targetDate.isAfter(currDate);
};

const isPresentFilter = (date) => {
  const currDate = dayjs();
  const targetDate = dayjs(date);

  return targetDate.isSame(currDate, 'day');
};

const isPastFilter = (date) => {
  const currDate = dayjs();
  const targetDate = dayjs(date);

  return targetDate.isBefore(currDate);
};

const filter = {
  [FilterType.EVERYTHING]: (eventPoints) => eventPoints,
  [FilterType.FUTURE]: (eventPoints) => eventPoints.filter((eventPoint) => isFutureFilter(eventPoint.dateTo)),
  [FilterType.PRESENT]: (eventPoints) => eventPoints.filter((eventPoint) => isPresentFilter(eventPoint.dateTo)),
  [FilterType.PAST]: (eventPoints) => eventPoints.filter((eventPoint) => isPastFilter(eventPoint.dateTo)),
};

export {filter};
