import Observable from '../framework/observable.js';
import { UpdateType } from '../const.js';
// import FailedToLoadView from '../view/failed-to-load-view.js';
// import { render } from '../framework/render';

export default class ModelPoints extends Observable{

  #points = [];
  // #destinations = [];
  // #offers = [];
  #pointsApiService = null;
  // #failedToLoadComponent = new FailedToLoadView();
  // #pointsContainer = null;
  
  #modelDestinations = null;
  #modelOffers = null;

  // constructor({ pointsApiService, pointsContainer, modelDestinations, modelOffers}) {
    constructor({ pointsApiService, modelDestinations, modelOffers}) {
    super();
    this.#pointsApiService = pointsApiService;
    this.#modelDestinations = modelDestinations;
    this.#modelOffers = modelOffers;
    // this.#pointsContainer = pointsContainer;
  }

  get points() {
    return this.#points;
  }

  // get destinations() {
  //   return this.#destinations;
  // }

  // get offers() {
  //   return this.#offers;
  // }

  #adaptToClient(point) {
    const adaptedPoint = {
      ...point,
      dateFrom: point['date_from'] !== null ? new Date(point['date_from']) : null,
      dateTo: point['date_to'] !== null ? new Date(point['date_to']) : null,
      basePrice: point['base_price'],
      isFavorite: point['is_favorite'],
    };

    delete adaptedPoint['date_from'];
    delete adaptedPoint['date_to'];
    delete adaptedPoint['base_price'];
    delete adaptedPoint['is_favorite'];

    return adaptedPoint;
  }

  async init() {
    try {
      await Promise.all([this.#modelDestinations.init(), this.modelOffers.init()])
      const points = await this.#pointsApiService.points;
      this.#points = points.map(this.#adaptToClient);
      // this.#destinations = await this.#pointsApiService.allDestinations;

      // this.#offers = await this.#pointsApiService.allOffers;
    } catch (err) {
      // render(this.#failedToLoadComponent, this.#pointsContainer);
      this.#points = [];
    }

    this._notify(UpdateType.INIT);
  }

  async updatePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    try {
      const responce = await this.#pointsApiService.updatePoint(update);
      const updatedPoint = this.#adaptToClient(responce);

      this._notify(updateType, updatedPoint);
      this.#points = [
        ...this.#points.slice(0, index),
        updatedPoint,
        ...this.#points.slice(index + 1),
      ];

    } catch (err) {
      throw new Error('Can\'t update point');
    }
  }

  async addPoint(updateType, update) {
    try {
      const response = await this.#pointsApiService.addPoint(update);
      const addedPoint = this.#adaptToClient(response);
      this.#points = [addedPoint, ...this.#points];

      this._notify(updateType, addedPoint);
    } catch (err) {
      throw new Error('Can\'t add task');
    }
  }

  async deletePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    try {
      await this.#pointsApiService.deletePoint(update);
      this.#points = [
        ...this.#points.slice(0, index),
        ...this.#points.slice(index + 1),
      ];
      this._notify(updateType);
    } catch (err) {
      throw new Error('Can\'t delete task');
    }
  }
}
