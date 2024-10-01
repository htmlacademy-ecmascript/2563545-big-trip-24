import { COUNT_TRIP_EVENTS } from '../const.js';
import { getRandomPoints } from '../mock/points.js';

export default class ModelPoints {
  points = Array.from({ length: COUNT_TRIP_EVENTS }, getRandomPoints);

  getPoints() {
    return this.points;
  }
}
