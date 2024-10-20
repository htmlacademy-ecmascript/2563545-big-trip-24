import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { dateFormats, HOURS_PER_DAY, MILLISECONDS_IN_MINUTES} from '../const.js';

dayjs.extend(utc);

const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);

const humanizePointDate = (pointDate, dateFormat) => pointDate ? dayjs(pointDate).format(dateFormat) : '';

const getPointDuration = (pointDateFrom, pointDateTo) => {
  const humatizedDateFrom = dayjs(pointDateFrom);
  const humatizedDateTo = dayjs(pointDateTo);

  const pointDuration = dayjs.duration(humatizedDateTo.diff(humatizedDateFrom));

  if (pointDuration.days() > 0) {
    return pointDuration.format('DD[D] HH[H] mm[M]');
  }

  if (pointDuration.hours() > 0) {
    return pointDuration.format('HH[H] mm[M]');
  }

  return pointDuration.format('mm[M]');
};

function getWeightForPrice(a, b) {
  if (a.basePrice < b.basePrice) {
    return 1;
  }

  if (a.basePrice > b.basePrice) {
    return -1;
  }

  if (a.basePrice === b.basePrice) {
    return 0;
  }
}

function getWeightForTime(a, b) {
  const pointADuration = getPointDuration(a.dateFrom, a.dateTo);
  const pointBDuration = getPointDuration(b.dateFrom, b.dateTo);

  if (pointADuration < pointBDuration) {
    return 1;
  }

  if (pointADuration > pointBDuration) {
    return -1;
  }

  if (pointADuration === pointBDuration) {
    return 0;
  }
}

function getDifferencesDates(dateFrom, dateTo) {
  const difference = dayjs.utc(dateTo).diff(dateFrom);

  if (difference < MILLISECONDS_IN_MINUTES) {
    return dayjs.utc(difference).format('mm[M]');
  } else if (difference > MILLISECONDS_IN_MINUTES && difference < MILLISECONDS_IN_MINUTES * HOURS_PER_DAY) {
    return dayjs.utc(difference).format('HH[H] mm[M]');
  } else {
    return dayjs.utc(difference).format('DD[D] HH[H] mm[M]');
  }
}

function getFullDateIncompleteYear(date) {
  return date ? dayjs.utc(date).format(dateFormats.fullDateIncompleteYear) : '';
}

function getMonthDay(date) {
  return date ? dayjs.utc(date).format(dateFormats.monthDay) : '';
}

function getYearMonthDay(date) {
  return date ? dayjs.utc(date).format(dateFormats.yearMonthDay) : '';
}

function getFullDateTime(date) {
  return date ? dayjs.utc(date).format(dateFormats.fullDateTime) : '';
}

function getHoursMinutes(date) {
  return date ? dayjs.utc(date).format(dateFormats.hoursMinutes) : '';
}

const getOffersByType = (type, offers) => offers.find((offer) => offer.type === type).offers;

const getDestinationId = (destinationName, destinations) => destinations.find((destinationElement) => destinationElement.name === destinationName).id;

export {getPointDuration, getFullDateIncompleteYear, getMonthDay, getYearMonthDay, getHoursMinutes, getDifferencesDates, getFullDateTime, humanizePointDate, getWeightForPrice, getWeightForTime, capitalize, getOffersByType, getDestinationId};
