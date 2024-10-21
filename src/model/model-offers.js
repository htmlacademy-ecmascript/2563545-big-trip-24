// import { getOffers } from '../mock/offers.js';
// import Observable from '../framework/observable';

export default class ModelOffers {
  // export default class ModelOffers extends Observable{
  // #offers = getOffers();

  // get offers() {
  //   return this.#offers;
  // }
  #pointsApiService = null;
  #offers = []

  constructor(pointsApiService) {
    this.#pointsApiService = pointsApiService;
  }
  async init() {
    // this.#offers = await this.#pointsApiService.offers;
    // return this.#offers;
    try {
      const offers = await this.#pointsApiService.offers;
      this.#offers = offers;
    } catch(err) {
      this.#offers = [];
    }
  }

  get () {
    return this.#offers;
  }

  getByType(type){
    return this.#offers
    .find((offer) => offer.type === type).offers;
  }
}
