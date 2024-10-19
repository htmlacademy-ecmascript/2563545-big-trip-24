import {render, RenderPosition} from '../framework/render.js';
import AddPointView from '../view/add-point-view.js';
// import EditPointView from './view/edit-point-view.js';
import EventsView from '../view/events-view.js';
import SortView from '../view/sort-view.js';
// import PointView from './view/point-view.js';
import NewPointView from '../view/new-point-view.js';
import PointPresenter from '../presenter/point-presenter.js';
import { updatePoint } from '../utils/common.js';
import { SortType } from '../const.js';
import { getWeightForPrice, getWeightForTime } from '../utils/utils.js';

export default class Presenter {
  #eventsComponent = new EventsView();
  // #sortComponent = new SortView();
  #newPointView = new NewPointView();
  #pointPresenters = new Map();

  #eventsContainer = null;
  #modelDestinations = null;
  #modelOffers = null;
  #modelPoints = null;

  #destinations = [];
  #offers = [];
  #points = [];

  #sort = null;
  #currentSortType = SortType.DAY;
  #initialPointsLayout = [];

  constructor({eventsContainer, modelPoints, modelOffers, modelDestinations}) {
    this.#eventsContainer = eventsContainer;
    this.#modelDestinations = modelDestinations;
    this.#modelOffers = modelOffers;
    this.#modelPoints = modelPoints;
  }

  init() {
    this.#points = [...this.#modelPoints.points()];
    this.#destinations = this.#modelDestinations.destinations();
    this.#offers = this.#modelOffers.offers();
    this.#initialPointsLayout = [...this.#modelPoints.points];

    this.#renderMain();
    render(new AddPointView(), this.#eventsComponent.element());
  }

  #renderMain() {
    render(this.#eventsComponent, this.#eventsContainer);

    if (this.#points.length === 0) {
      this.#renderNewPointView();
    }

    this.#renderPointsList();
  }

  #renderPointView(point) {
    const pointPresenter = new PointPresenter({
      pointContainer: this.#eventsComponent.element,
      onPointsChange: this.#handlePointsChange,
      onModeChange: this.#handleModeChange,
      onPointClear: this.#clearPoint,
      onEditPointView: this.#resetPointView
    });

    pointPresenter.init(point, this.#offers, this.#destinations);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #handleSortClick = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#sortPoints(sortType);
    this.#renderSort(sortType);
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
    const targetPresenter = this.#pointPresenters.get(point.id);
    targetPresenter.destroy();
  };

  #resetPointView = (point) => {
    this.#pointPresenters.get(point.id).resetView();
  };

  #renderNewPointView() {
    render(this.#newPointView, this.#eventsComponent.element);
  }

  #sortPoints = (sortType) => {
    switch (sortType) {
      case SortType.TIME:
        this.#points.sort(getWeightForTime);
        break;
      case SortType.PRICE:
        this.#points.sort(getWeightForPrice);
        break;
      case SortType.EVENT:
        break;
      case SortType.OFFER:
        break;
      case SortType.DAY:
        this.#points = [...this.#initialPointsLayout];
    }
    this.#currentSortType = sortType;
  };

  #renderSort(sortType) {
    this.#sort = new SortView({
      onSortClick: this.#handleSortClick,
      sortType: sortType
    });

    render(this.#sort, this.#eventsContainer, RenderPosition.AFTERBEGIN);
  }

  #clearPointsList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  #renderPointsList() {
    for (const point of this.#points) {
      this.#renderPointView(point);
    }
  }
}
