import { getOffers } from '../mock/offers.js';
import Observable from '../framework/observable';

// export default class ModelOffers {
export default class ModelOffers extends Observable{
  #offers = getOffers();

  get offers() {
    return this.#offers;
  }
}
