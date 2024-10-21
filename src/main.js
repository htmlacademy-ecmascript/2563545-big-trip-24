import {render, RenderPosition} from './framework/render.js';
import TripView from './view/trip-view';
import Presenter from './presenter/presenter.js';
import FiltersPresenter from './presenter/filter-presenter.js';
import ModelPoints from './model/model-points.js';
import ModelOffers from './model/model-offers.js';
import ModelDestinations from './model/model-destinations.js';
import ModelFilters from './model/model-filters.js';
import PointsApiService from './points-api-service';
import AddNewPointButtonView from './view/add-new-point-button-view';

const AUTHORIZATION = 'Basic fjr3598kro54983dl';
const END_POINT = 'https://24.objects.htmlacademy.pro/big-trip';

// const headerContainer = document.querySelector('.page-header');
const mainContainer = document.querySelector('.trip-main');
const filtersContainer = document.querySelector('.trip-controls__filters');
const pointsContainer = document.querySelector('.trip-events');

const pointsApiService =  new PointsApiService(END_POINT, AUTHORIZATION);
const modelOffers = new ModelOffers(pointsApiService);
const modelDestinations = new ModelDestinations(pointsApiService);
const modelFilters = new ModelFilters();

const modelPoints = new ModelPoints({
  // pointsApiService: new PointsApiService(END_POINT, AUTHORIZATION),
  pointsApiService: pointsApiService,
  // pointsContainer: pointsContainer,
  modelDestinations,
  modelOffers
});

const presenter = new Presenter({
  pointsContainer: pointsContainer,
  modelPoints,
  modelOffers,
  modelDestinations,
  modelFilters,
  onNewPointCancel: cancelNewPoint,
});

const filtersPresenter = new FiltersPresenter({
  filtersContainer: filtersContainer,
  modelPoints,
  modelFilters,
});

const addNewPointButton = new AddNewPointButtonView({
  onClick: onNewPointButtonClick,
});

render(new TripView(), mainContainer, RenderPosition.AFTERBEGIN);

function onNewPointButtonClick() {
  presenter.createPoint();
  addNewPointButton.element.disabled = true;
}

function cancelNewPoint() {
  addNewPointButton.element.disabled = false;
}

filtersPresenter.init();
presenter.init();

modelPoints.init()
  .finally(() => {
    render(addNewPointButton, mainContainer);
  });
