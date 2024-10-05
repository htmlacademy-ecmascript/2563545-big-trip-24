import { COUNT_TRIP_EVENTS } from '../const.js';
import { getRandomPoints } from '../mock/points.js';

export default class ModelPoints {
  #points = Array.from({ length: COUNT_TRIP_EVENTS }, getRandomPoints);

  get points() {
    return this.#points;
  }
}
