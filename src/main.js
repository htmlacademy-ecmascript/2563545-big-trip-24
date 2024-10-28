import TripPresenter from './presenter/trip-presenter';
import Presenter from './presenter/presenter.js';
import ModelPoints from './model/model-points.js';
import ModelFilters from './model/model-filters';
import FiltersPresenter from './presenter/filters-presenter';
import PointsApiService from './points-api-service';

const AUTHORIZATION = 'Basic eo0wdfg2563605aa';
const END_POINT = 'https://24.objects.htmlacademy.pro/big-trip';

const mainContainer = document.querySelector('.trip-main');
const filtersContainer = document.querySelector('.trip-controls__filters');
const pointsContainer = document.querySelector('.trip-events');

const modelPoints = new ModelPoints({
  pointsApiService: new PointsApiService(END_POINT, AUTHORIZATION),
});
const modelFilters = new ModelFilters();

const presenter = new Presenter({
  pointsContainer,
  mainContainer,
  modelPoints,
  modelFilters,
});

const filtersPresenter = new FiltersPresenter({
  filtersContainer: filtersContainer,
  modelPoints,
  modelFilters,
});

const tripPresenter = new TripPresenter({
  modelPoints,
  mainContainer,
});

presenter.init();

modelPoints.init()
  .finally(() => {
    filtersPresenter.init();
    tripPresenter.init();
  });
