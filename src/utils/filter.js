import { FilterType } from '../const';

const isPointFuture = (point) => {
  const currentDate = new Date();
  const pointDataFrom = new Date(point.dateFrom);

  return pointDataFrom > currentDate;
};

const isPointPast = (point) => {
  const currentDate = new Date();
  const pointDataTo = new Date(point.dateTo);

  return pointDataTo < currentDate;
};

const isPointPresent = (point) => {
  const currentDate = new Date();
  const pointDataTo = new Date(point.dateTo);
  const pointDataFrom = new Date(point.dateFrom);

  return pointDataFrom <= currentDate && pointDataTo >= currentDate;
};

const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => isPointFuture(point)),
  [FilterType.PRESENT]: (points) => points.filter((point) => isPointPresent(point)),
  [FilterType.PAST]: (points) => points.filter((point) => isPointPast(point)),
};

export { filter, isPointPast , isPointFuture, isPointPresent };
