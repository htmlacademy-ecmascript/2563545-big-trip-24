import {render, replace} from './framework/render.js';
import AddPointView from './view/add-point-view.js';
import EditPointView from './view/edit-point-view.js';
import EventsView from './view/events-view.js';
import SortView from './view/sort-view.js';
import PointView from './view/point-view.js';
import NewPointView from './view/new-point-view.js';

export default class Presenter {
  #eventsComponent = new EventsView();

  #eventsContainer = null;
  #modelDestinations = null;
  #modelOffers = null;
  #modelPoints = null;

  #destinations = [];
  #offers = [];
  #points = [];

  constructor({eventsContainer, modelPoints, modelOffers, modelDestinations}) {
    this.#eventsContainer = eventsContainer;
    this.#modelDestinations = modelDestinations;
    this.#modelOffers = modelOffers;
    this.#modelPoints = modelPoints;
  }

  init() {
    this.#points = [...this.#modelPoints.points()];
    this.#destinations = this.#modelDestinations.destinations();
    this.#offers = this.#modelOffers.offers();

    render(this.#eventsComponent, this.#eventsContainer);
    // render(new SortView(), this.#eventsComponent.element());
    render(new SortView(), this.#eventsContainer);
    render(new AddPointView(), this.#eventsComponent.element());

    // render(new EditPointView(), this.#eventsComponent.element());
    if (this.#points.length === 0) {
      render(new NewPointView(), this.#eventsContainer.element);
    }

    for (let i = 0; i < this.#points.length; i++) {
      this.#renderPointView(this.#points[i]);
    }
  }

  #renderPointView(points, offers, destinations){
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };
    const pointComponent = new PointView({
      points,
      offers,
      destinations,
      onEditClick: () => {
        replacePointToForm();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    const editPointComponent = new EditPointView({
      points,
      offers,
      destinations,
      onEditClick: () => {
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      },
      onFormSaveClick: () => {
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    });

    function replacePointToForm() {
      replace(editPointComponent, pointComponent);
    }

    function replaceFormToPoint() {
      replace(pointComponent, editPointComponent);
    }
    render(pointComponent, this.#eventsComponent.element());
  }
}
