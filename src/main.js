// import { render, RenderPosition } from './render';
import {render, RenderPosition} from './framework/render.js';
import TripView from './view/trip-view';
import FilterView from './view/filter-view';
import Presenter from './presenter.js';
import ModelPoints from './model/model-points.js';
import ModelOffers from './model/model-offers.js';
import ModelDestinations from './model/model-destinations.js';

const tripHeaderElement = document.querySelector('.page-header');
const tripTripMainElement = tripHeaderElement.querySelector('.trip-main');
const tripFiltersElement = tripHeaderElement.querySelector('.trip-controls__filters');
const tripMainElement = document.querySelector('.page-main');
const tripEventsElement = tripMainElement.querySelector('.trip-events');

const modelPoints = new ModelPoints();
const modelOffers = new ModelOffers();
const modelDestinations = new ModelDestinations();

const presenter = new Presenter({container: tripEventsElement, modelPoints, modelOffers, modelDestinations});

render(new TripView(), tripTripMainElement, RenderPosition.AFTERBEGIN);
render(new FilterView(), tripFiltersElement);

presenter.init();
