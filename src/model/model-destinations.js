import { getDestinations } from '../mock/destinations.js';
import Observable from '../framework/observable';

// export default class ModelDestination {
export default class ModelDestination extends Observable{
  #destinations = getDestinations();

  get destinations() {
    return this.#destinations;
  }
}
