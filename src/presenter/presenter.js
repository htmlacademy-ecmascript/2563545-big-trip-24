import {render, RenderPosition, remove} from '../framework/render.js';
// import AddPointView from './view/add-point-view.js';
// import EditPointView from './view/edit-point-view.js';
import EventsView from '../view/events-view.js';
import SortView from '../view/sort-view.js';
// import PointView from './view/point-view.js';
import NewPointView from '../view/new-point-view.js';
import PointPresenter from './point-presenter.js';
import { updatePoint } from '../utils/common.js';
import { SortType, UpdateType, UserAction, FilterType } from '../const.js';
import { getWeightForPrice, getWeightForTime } from '../utils/utils.js';
import NewPointPresenter from './new-point-presenter';
import LoadingView from '../view/loading-view';
import { filter } from '../utils/filter';

export default class Presenter {
  #eventsComponent = new EventsView();
  #loadingComponent = new LoadingView();
  #newPoints = null;
  #pointPresenters = new Map();
  #eventsContainer = null;

  #modelDestinations = null;
  #modelOffers = null;
  #modelPoints = null;
  #modelFilters = null;
  #newPointPresenter = null;

  #destinations = [];
  #offers = [];
  #points = [];

  #sort = null;
  #isLoading = true;
  #currentSortType = SortType.DAY;
  #currentFilterType = FilterType.EVERYTHING;

  constructor({eventsContainer, modelPoints, modelOffers, modelDestinations, filtersModel, onNewPointCancel }) {
    this.#eventsContainer = eventsContainer;
    this.#modelDestinations = modelDestinations;
    this.#modelOffers = modelOffers;
    this.#modelPoints = modelPoints;
    this.#modelFilters = filtersModel;

    this.#newPointPresenter = new NewPointPresenter({
      eventsComponent: this.#eventsComponent.element,
      onPointAdd: this.#handleViewAction,
      onDestroy: onNewPointCancel,
    });

    this.#modelPoints.addObserver(this.#handleModelEvent);
    this.#modelFilters.addObserver(this.#handleModelEvent);
  }

  get filter() {
    return this.#modelFilters.filter;
  }

  get points() {
    this.#currentFilterType = this.filter;
    const points = [...this.#modelPoints.points];
    const filteredPoints = filter[this.#currentFilterType](points);

    switch (this.#currentSortType) {
      case SortType.TIME:
        return filteredPoints.sort(getWeightForTime);
      case SortType.PRICE:
        return filteredPoints.sort(getWeightForPrice);
    }
    return filteredPoints;
  }

  get offers() {
    return this.#modelOffers.offers;
  }

  get destinations() {
    return this.#modelDestinations.destinations;
  }

  createPoint() {
    this.#currentSortType = FilterType.DAY;
    this.#modelFilters.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newPointPresenter.init(this.offers, this.destinations);
  }

  init() {
    this.#renderSort(this.#currentSortType);
    this.#renderMain();
  }

  #renderMain() {
    render(this.#eventsComponent, this.#eventsContainer);

    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    this.#renderPointsList();
  }

  #renderPointView(point) {
    const pointPresenter = new PointPresenter({
      pointContainer: this.#eventsComponent.element,
      onPointsChange: this.#handlePointsChange,
      onModeChange: this.#handleModeChange,
      onPointClear: this.#clearPoint,
      onEditPointView: this.#resetPointView,
      onModelUpdate: this.#handleViewAction,
    });

    pointPresenter.init(point, this.#offers, this.#destinations);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#modelPoints.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#modelPoints.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#modelPoints.deletePoint(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, updatedPoint) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenters.get(updatedPoint.id).init(updatedPoint, this.offers, this.destinations);
        break;
      case UpdateType.MINOR:
        this.#clearPointsList();
        this.#renderPointsList();
        break;
      case UpdateType.MAJOR:
        this.#clearPointsList({ resetFilters: true, resetSorting: true });
        this.#renderPointsList();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderMain();
        break;
    }
  };

  #handleSortClick = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;
    this.#renderSort(this.#currentSortType);
    remove(this.#sort);
    this.#clearPointsList();
    this.#renderPointsList();
  };

  #handlePointsChange = (updatedPoint) => {
    this.#points = updatePoint(this.#points, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint, this.#offers, this.#destinations);
  };

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #clearPoint = (point) => {
    this.#handleViewAction(UserAction.DELETE_POINT, UpdateType.MINOR, point);
  };

  #resetPointView = (point) => {
    this.#pointPresenters.get(point.id).resetView();
  };

  #renderNewPointView() {
    this.#newPoints = new NewPointView({
      filter: this.#currentFilterType,
    });

    render(this.#newPoints, this.#eventsComponent.element);
  }

  #renderSort(sortType) {
    this.#sort = new SortView({
      onSortClick: this.#handleSortClick,
      sortType: sortType
    });

    render(this.#sort, this.#eventsContainer, RenderPosition.AFTERBEGIN);
  }

  #renderLoading() {
    render(this.#loadingComponent,this.#eventsContainer);
  }

  #clearPointsList({ resetFilters = false, resetSorting = false } = {}) {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
    remove(this.#loadingComponent);
    if (resetFilters) {
      this.#currentFilterType = FilterType.EVERYTHING;
    }

    if (resetSorting) {
      this.#currentSortType = SortType.DAY;
    }
  }

  #renderPointsList() {
    remove(this.#newPoints);

    if (this.points.length === 0) {
      this.#renderNewPointView();
      return;
    }
    for (const point of this.points) {
      this.#renderPointView(point);
    }
  }
}
