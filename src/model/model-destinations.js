import { getDestinations } from '../mock/destinations.js';

export default class ModelDestination {
  destinations = getDestinations();

  getDestinations() {
    return this.destinations;
  }
}
