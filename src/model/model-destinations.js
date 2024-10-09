import { getDestinations } from '../mock/destinations.js';

export default class ModelDestination {
  #destinations = getDestinations();

  get destinations() {
    return this.#destinations;
  }
}
