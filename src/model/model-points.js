import Observable from '../framework/observable';
import { UpdateType } from '../const';

export default class ModelPoints extends Observable {
  #points = [];
  #destinations = [];
  #offers = [];
  #pointsApiService = null;
  #isFailedToLoadPoints = false;

  constructor({ pointsApiService }) {
    super();
    this.#pointsApiService = pointsApiService;
  }

  get points() {
    return this.#points;
  }

  get destinations() {
    return this.#destinations;
  }

  get offers() {
    return this.#offers;
  }

  get failedToLoadPoints() {
    return this.#isFailedToLoadPoints;
  }

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
      const points = await this.#pointsApiService.points;
      this.#points = points.map(this.#adaptToClient);
      this.#destinations = await this.#pointsApiService.destinations;

      this.#offers = await this.#pointsApiService.offers;
    } catch (err) {
      this.#points = [];
      this.#offers = [];
      this.#destinations = [];
      this.#isFailedToLoadPoints = true;
    }

    this._notify(UpdateType.INIT);
  }

  async updatePoint(updateType, update) {
    const pointIndex = this.#points.findIndex((point) => point.id === update.id);

    if (pointIndex === -1) {
      throw new Error('Can\'t update unexisting task');
    }

    try {
      const response = await this.#pointsApiService.updatePoint(update);
      const updatedPoint = this.#adaptToClient(response);

      this.#points = [
        ...this.#points.slice(0, pointIndex),
        updatedPoint,
        ...this.#points.slice(pointIndex + 1),
      ];

      this._notify(updateType, updatedPoint);
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
    try {
      await this.#pointsApiService.deletePoint(update);
      this.#points = this.#points.filter((point) => point.id !== update.id);

      this._notify(updateType);
    } catch (err) {
      throw new Error('Can\'t delete task');
    }
  }
}