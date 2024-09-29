import { getOffers } from '../mock/offers.js';

export default class ModelOffers {
  offers = getOffers();

  getOffers() {
    return this.offers;
  }
}
