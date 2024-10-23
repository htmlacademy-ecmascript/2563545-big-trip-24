import EventsView from '../view/events-view';
import SortView from '../view/sort-view';
import NewPointView from '../view/new-point-view';
import AddNewPointButtonView from '../view/add-new-point-button-view';
import FailedToLoadView from '../view/failed-to-load-view';
import { RenderPosition, remove, render } from '../framework/render';
import PointPresenter from './point-presenter';
import { SortType, UpdateType, UserAction, FilterType, TimeLimit } from '../const';
import { getWeightForPrice, getWeightForTime, getWeigthForDay } from '../utils/common';
import { filter } from '../utils/filter';
import NewPointPresenter from './new-point-presenter';
import LoadingView from '../view/loading-view';
import UiBlocker from '../framework/ui-blocker/ui-blocker';

export default class Presenter {
  #eventsComponent = new EventsView();
  #loadingComponent = new LoadingView();
  #failedToLoadComponent = new FailedToLoadView();
  #mainContainer = null;
  #pointsContainer = null;
  #modelPoints = null;
  #pointPresenters = new Map();
  #newPoints = null;
  #modelFilters = null;
  #newPointPresenter = null;
  #addNewPointButton = null;
  #isLoading = true;
  #sort = null;
  #currentSortType = SortType.DAY;
  #currentFilterType = FilterType.EVERYTHING;
  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT
  });

  constructor({ pointsContainer, modelPoints, modelFilters, mainContainer }) {
    this.#pointsContainer = pointsContainer;
    this.#mainContainer = mainContainer;
    this.#modelPoints = modelPoints;
    this.#modelFilters = modelFilters;

    this.#newPointPresenter = new NewPointPresenter({
      pointsListContainer: this.#eventsComponent.element,
      onPointAdd: this.#handleViewAction,
      onDestroy: this.#handleNewPointCancel,
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
      case SortType.DAY:
        return filteredPoints.sort(getWeigthForDay);
    }
    return filteredPoints;
  }

  get offers() {
    return this.#modelPoints.offers;
  }

  get destinations() {
    return this.#modelPoints.destinations;
  }

  init() {
    this.#renderMain();
  }

  createPoint() {
    this.#currentSortType = FilterType.DAY;
    this.#modelFilters.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newPointPresenter.init(this.offers, this.destinations);
    remove(this.#newPoints);
  }

  renderAddNewPointButton() {
    this.#addNewPointButton = new AddNewPointButtonView({
      onClick: this.#handleNewPointButtonClick,
    });
    render(this.#addNewPointButton, this.#mainContainer);
  }

  #renderMain() {
    render(this.#eventsComponent, this.#pointsContainer);
    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }
    this.renderAddNewPointButton();
    this.#renderPointsList();
  }

  #renderSort(sortType) {
    this.#sort = new SortView({
      onSortClick: this.#handleSortClick,
      sortType: sortType
    });

    render(this.#sort, this.#pointsContainer, RenderPosition.AFTERBEGIN);
  }

  #renderLoading() {
    render(this.#loadingComponent, this.#pointsContainer);
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      eventsComponent: this.#eventsComponent.element,
      onModeChange: this.#handleModeChange,
      onEditPointView: this.#resetPointView,
      onModelUpdate: this.#handleViewAction,
    });

    pointPresenter.init(point, this.offers, this.destinations);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #resetPointView = (point) => {
    this.#pointPresenters.get(point.id).resetView();
  };

  #renderPointsList() {
    remove(this.#sort);
    this.#renderSort(this.#currentSortType);

    if (this.#modelPoints.failedToLoadPoints) {
      this.#renderFailedToLoadPoints();
      return;
    }

    if (this.points.length === 0 && !this.#modelPoints.failedToLoadPoints) {
      this.#renderNewPoints();
      return;
    }

    for (const point of this.points) {
      this.#renderPoint(point);
    }
  }

  #renderFailedToLoadPoints() {
    render(this.#failedToLoadComponent, this.#pointsContainer);
  }

  #renderNewPoints() {
    this.#newPoints = new NewPointView({
      filter: this.#currentFilterType,
    });

    render(this.#newPoints, this.#pointsContainer);
  }

  #clearPointsList({ resetFilters = false, resetSort = false } = {}) {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
    this.#newPointPresenter.destroy();

    remove(this.#sort);
    remove(this.#loadingComponent);

    if (resetFilters) {
      this.#currentFilterType = FilterType.EVERYTHING;
    }

    if (resetSort) {
      this.#currentSortType = SortType.DAY;
    }

    if (this.#newPoints) {
      remove(this.#newPoints);
    }
  }

  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointPresenters.get(update.id).setSaving();
        try {
          await this.#modelPoints.updatePoint(updateType, update);
        } catch (err) {
          this.#pointPresenters.get(update.id).setAborting();
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
        this.#pointPresenters.get(update.id).setDeleting();
        try {
          await this.#modelPoints.deletePoint(updateType, update);
        } catch (err) {
          this.#pointPresenters.get(update.id).setAborting();
        }
        break;
    }
    this.#uiBlocker.unblock();
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
        this.#clearPointsList({ resetFilters: true, resetSort: true });
        this.#renderPointsList();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderMain();
        break;
    }
  };

  #handleNewPointButtonClick = () => {
    this.createPoint();
    this.#addNewPointButton.element.disabled = true;
  };

  #handleModeChange = () => {
    this.#newPointPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleNewPointCancel = () => {
    this.#addNewPointButton.element.disabled = false;

    if (this.points.length === 0) {
      this.#renderNewPoints();
    }
  };

  #handleSortClick = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearPointsList();
    remove(this.#sort);
    this.#renderSort(this.#currentSortType);
    this.#renderPointsList();
  };
}
