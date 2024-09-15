import TripView from './view/trip-view';
import FilterView from './view/filter-view';
import Presenter from './presenter';
import { render, RenderPosition } from './render';

const tripHeaderElement = document.querySelector('.page-header');
const tripTripMainElement = tripHeaderElement.querySelector('.trip-main');
const tripFiltersElement = tripHeaderElement.querySelector('.trip-controls__filters');
const tripMainElement = document.querySelector('.page-main');
const tripEventsElement = tripMainElement.querySelector('.trip-events');
const presenter = new Presenter({container: tripEventsElement});

render(new TripView(), tripTripMainElement, RenderPosition.AFTERBEGIN);
render(new FilterView(), tripFiltersElement);
Presenter.init();