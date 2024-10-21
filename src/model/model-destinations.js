// import { getDestinations } from '../mock/destinations.js';
// import Observable from '../framework/observable';

export default class ModelDestination {
// export default class ModelDestination extends Observable{
//   #destinations = getDestinations();

//   get destinations() {
//     return this.#destinations;
//   }

#pointsApiService = null;
#destinations = []

constructor(pointsApiService) {
  this.#pointsApiService = pointsApiService;
}
async init() {
  // this.#destinations = await this.#pointsApiService.destinations;
  // return this.#destinations;
  try {
    const destinations = await this.#pointsApiService.destinations;
    this.#destinations = destinations;
  } catch(err) {
    this.#destinations = [];
  }
}

get () {
  return this.#destinations;
}

getById(id){
  return this.#destinations
  .find((destination) => destination.id === id).destinations;
}
}

