import { getOffers } from '../mock/offers.js';

export default class ModelOffers {
  #offers = getOffers();

  get offers() {
    return this.#offers;
  }
}
