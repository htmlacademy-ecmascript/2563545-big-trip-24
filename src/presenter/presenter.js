import {render, RenderPosition, remove} from '../framework/render.js';
import EventsView from '../view/events-view.js';
import SortView from '../view/sort-view.js';
import NewPointView from '../view/new-point-view.js';
import PointPresenter from './point-presenter.js';
import { SortType, UpdateType, UserAction, FilterType, TimeLimit } from '../const.js';
import { getWeightForPrice, getWeightForTime } from '../utils/utils.js';
import NewPointPresenter from './new-point-presenter';
import LoadingView from '../view/loading-view';
import { filter } from '../utils/filter';
import UiBlocker from '../framework/ui-blocker/ui-blocker';
console.log('Presenter')
export default class Presenter {
  #eventsComponent = new EventsView();
  #loadingComponent = new LoadingView();
  #newPoints = null;
  #pointPresenter = new Map();
  #pointsContainer = null;

  #modelDestinations = null;
  #modelOffers = null;
  #modelPoints = null;
  #modelFilters = null;
  #newPointPresenter = null;

  #destinations = [];
  #offers = [];
  // #points = [];

  #sort = null;
  #isLoading = true;
  #currentSortType = SortType.DAY;
  #currentFilterType = FilterType.EVERYTHING;

  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT
  });

  constructor({pointsContainer, modelPoints, modelOffers, modelDestinations, modelFilters, onNewPointCancel }) {
  // constructor({pointsContainer, modelPoints, modelFilters, onNewPointCancel }) {

    this.#pointsContainer = pointsContainer;
    this.#modelDestinations = modelDestinations;
    this.#modelOffers = modelOffers;
    this.#modelPoints = modelPoints;
    this.#modelFilters = modelFilters;

    this.#newPointPresenter = new NewPointPresenter({
      pointsContainer: this.#eventsComponent.element,
      onPointAdd: this.#handleViewAction,
      onDestroy: onNewPointCancel,
      modelOffers,
      modelDestinations
    });

    this.#modelPoints.addObserver(this.#handleModelEvent);
    // this.#modelOffers.addObserver(this.#handleModelEvent);
    // this.#modelDestinations.addObserver(this.#handleModelEvent);
    this.#modelFilters.addObserver(this.#handleModelEvent);
  }

  get filter() {
    return this.#modelFilters.filter;
  }

  get points() {
    this.#currentFilterType = this.filter;
    const points = this.#modelPoints.points;
    const filteredPoints = filter[this.#currentFilterType](points);

    switch (this.#currentSortType) {
      case SortType.TIME:
        return filteredPoints.sort(getWeightForTime);
      case SortType.PRICE:
        return filteredPoints.sort(getWeightForPrice);
    }
    return filteredPoints;
  }

  // get offers() {
  //   // return this.#modelOffers.offers;
  //   return this.#modelPoints.offers;
  // }

  // get destinations() {
  //   // return this.#modelDestinations.destinations;
  //   return this.#modelPoints.destinations;
  // }

  createPoint() {
    this.#currentSortType = FilterType.DAY;
    this.#modelFilters.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    // this.#newPointPresenter.init(this.offers, this.destinations);
    this.#newPointPresenter.init();
  }

  init() {
    this.#renderSort(this.#currentSortType);
    this.#renderMain();
  }

  #renderMain() {
    render(this.#eventsComponent, this.#pointsContainer);

    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    this.#renderPointsList();
  }

  #renderPointView(point) {
    const pointPresenter = new PointPresenter({
      eventsComponent: this.#eventsComponent.element,
      onPointsChange: this.#handleModelEvent,
      onModeChange: this.#handleModeChange,
      onPointClear: this.#clearPoint,
      onEditPointView: this.#resetPointView,
      onModelUpdate: this.#handleViewAction,
      modelDestinations: this.#modelDestinations,
      modelOffers: this.#modelOffers,
    });

    // pointPresenter.init(point, this.#offers, this.#destinations);
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  }

  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointPresenter.get(update.id).setSaving();
        try {
          await this.#modelPoints.updatePoint(updateType, update);
        } catch (err) {
          this.#pointPresenter.get(update.id).setAborting();
        }
        break;
      case UserAction.ADD_POINT:
        this.#newPointPresenter.setSaving();
        try {
          await this.#modelPoints.addPoint(updateType, update);
        } catch (err) {
          this.#newPointPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_POINT:
        this.#pointPresenter.get(update.id).setDeleting();
        try {
          await this.#modelPoints.deletePoint(updateType, update);
        } catch (err) {
          this.#pointPresenter.get(update.id).setAborting();
        }
        break;
    }
    this.#uiBlocker.unblock();
  };

  #handleModelEvent = (updateType, updatedPoint) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenter.get(updatedPoint.id).init(updatedPoint, this.offers, this.destinations);
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

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #clearPoint = (point) => {
    this.#handleViewAction(UserAction.DELETE_POINT, UpdateType.MINOR, point);
  };

  #resetPointView = (point) => {
    this.#pointPresenter.get(point.id).resetView();
  };

  #renderNewPointView() {
    this.#newPoints = new NewPointView({
      filter: this.#currentFilterType,
    });
    remove(this.#eventsComponent);
    render(this.#newPoints, this.#pointsContainer);
  }

  #renderSort(sortType) {
    this.#sort = new SortView({
      onSortClick: this.#handleSortClick,
      sortType: sortType
    });

    render(this.#sort, this.#pointsContainer, RenderPosition.AFTERBEGIN);
  }

  #renderLoading() {
    render(this.#loadingComponent,this.#pointsContainer);
  }

  #clearPointsList({ resetFilters = false, resetSorting = false } = {}) {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
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

    if (this.points.length === 0 && !document.querySelector('.trip-events__msg')) {
      this.#renderNewPointView();
      return;
    }
    for (const point of this.points) {
      this.#renderPointView(point);
    }
  }
}
