import AbstractView from '../framework/view/abstract-view';
import { humanizePointDate } from '../utils/common';
import { TRIP_INFO_DATE_FORMAT, COUNT_POINTS_ONE, COUNT_POINTS_TWO, COUNT_POINTS_THREE } from '../const';

const getFirstPoint = (points) => {
  const sortedByDateFromPoints = [...points].sort((pointA, pointB) => pointA.dateFrom - pointB.dateFrom);
  const firstPoint = sortedByDateFromPoints[0].dateFrom;
  return firstPoint;
};

const getLastPoint = (points) => {
  const sortedByDateFromPoints = [...points].sort((pointA, pointB) => pointB.dateTo - pointA.dateTo);
  const lastPoint = sortedByDateFromPoints[0].dateTo;
  return lastPoint;
};

const getDestinationsTitle = (points, destinations) => {
  const sortedByDateFromPoints = [...points].sort((pointA, pointB) => pointA.dateFrom - pointB.dateFrom);

  const firstDestinationId = sortedByDateFromPoints[0].destination;
  const lastDestinationId = sortedByDateFromPoints[sortedByDateFromPoints.length - 1].destination;

  const firstDestination = destinations.find((destination) => destination.id === firstDestinationId).name;
  const lastDestination = destinations.find((destination) => destination.id === lastDestinationId).name;

  if (points.length === COUNT_POINTS_ONE) {
    return `${firstDestination}`;
  }

  if (points.length === COUNT_POINTS_TWO) {
    const secondDestinationId = sortedByDateFromPoints[1].destination;
    const secondDestination = destinations.find((destination) => destination.id === secondDestinationId).name;
    return `${firstDestination} &mdash; ${secondDestination}`;
  }

  if (points.length === COUNT_POINTS_THREE) {
    const secondDestinationId = sortedByDateFromPoints[1].destination;
    const secondDestination = destinations.find((destination) => destination.id === secondDestinationId).name;
    return `${firstDestination} &mdash; ${secondDestination} &mdash; ${lastDestination}`;
  }

  if (points.length > COUNT_POINTS_THREE) {
    return `${firstDestination} &mdash; . . . &mdash; ${lastDestination}`;
  }
};

const getAllOffersCollection = (offers) => {
  const allOffersInfo = offers.map((offer) => offer.offers).flat();
  const allOffersCollection = new Map();

  allOffersInfo.forEach(() => {
    allOffersCollection.set(offers.id, offers.price);
  });

  return allOffersCollection;
};

const getOffersFullPrice = (points, offers) => {
  const pointOffersIdList = points.map((point) => point.offers).flat();
  const allOffersCollection = getAllOffersCollection(offers);

  let offersFullPrice = 0;

  allOffersCollection.forEach((value, key) => {
    pointOffersIdList.forEach((pointOfferId) => {
      if (key === pointOfferId) {
        offersFullPrice += value;
      }
    });
  });

  return offersFullPrice;
};

const getPointsFullPrice = (points) => {
  const allBasePriceList = points.map((point) => point.basePrice);
  const allBasePrice = allBasePriceList.reduce((priceA, priceB) => priceA + priceB, 0);

  return allBasePrice;
};

function createTripTemplate(points, destinations, offers) {
  return `<section class="trip-main__trip-info  trip-info">
  <div class="trip-info__main">
  <h1 class="trip-info__title">${getDestinationsTitle(points, destinations)}</h1>
    <p class="trip-info__dates">${humanizePointDate(getFirstPoint(points), TRIP_INFO_DATE_FORMAT)}&nbsp;&mdash;&nbsp;${humanizePointDate(getLastPoint(points), TRIP_INFO_DATE_FORMAT)}</p>
  </div>

  <p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${getPointsFullPrice(points) + getOffersFullPrice(points, offers)}</span>
  </p>
  </section>`;
}

export default class TripView extends AbstractView {
  #points = [];
  #destinations = [];
  #offers = [];

  constructor({ points, destinations, offers }) {
    super();
    this.#points = points;
    this.#destinations = destinations;
    this.#offers = offers;
  }

  get template() {
    return createTripTemplate(this.#points, this.#destinations, this.#offers);
  }
}
