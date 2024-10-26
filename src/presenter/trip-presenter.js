import TripView from '../view/trip-view';
import { RenderPosition } from '../framework/render';
import { render, replace, remove } from '../framework/render';

export default class TripPresenter {
  #modelPoints = null;
  #mainContainer = null;
  #tripComponent = null;

  constructor({ modelPoints, mainContainer }) {
    this.#modelPoints = modelPoints;
    this.#mainContainer = mainContainer;

    this.#modelPoints.addObserver(this.#handleModelEvent);
  }

  init() {
    if (this.#modelPoints.points.length === 0) {
      if (this.#tripComponent) {
        remove(this.#tripComponent);
      }
      return;
    }

    const prevTripInfoComponent = this.#tripComponent;

    this.#tripComponent = new TripView({
      points: this.#modelPoints.points,
      destinations: this.#modelPoints.destinations,
      offers: this.#modelPoints.offers,
    });

    if(!prevTripInfoComponent){
      render(this.#tripComponent, this.#mainContainer, RenderPosition.AFTERBEGIN);
      return;
    }

    replace(this.#tripComponent, prevTripInfoComponent);
    remove(prevTripInfoComponent);
  }

  #handleModelEvent = () => {
    this.init();
  };
}
