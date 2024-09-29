import {render} from './render.js';

import AddPointView from './view/add-point-view.js';
import EditPointView from './view/edit-point-view.js';
import EventsView from './view/events-view.js';
import SortView from './view/sort-view.js';
import PointView from './view/point-view.js';

export default class Presenter {
  eventsComponent = new EventsView();

  constructor({container, modelPoints, modelOffers, modelDestinations}) {
    this.eventsContainer = container;
    this.modelDestinations = modelDestinations;
    this.modelOffers = modelOffers;
    this.modelPoints = modelPoints;
  }

  init() {
    this.points = [...this.modelPoints.getPoints()];
    this.destinations = this.modelDestinations.getDestinations();
    this.offers = this.modelOffers.getOffers();

    render(this.eventsComponent, this.eventsContainer);
    render(new SortView(), this.eventsComponent.getElement());
    render(new EditPointView(), this.eventsComponent.getElement());
    render(new AddPointView(), this.eventsComponent.getElement());

    for (let i = 0; i < this.points.length; i++) {
      render(new PointView({
        points: this.points[i],
        offers: this.offers,
        destinations: this.destinations
      }), this.eventsComponent.getElement());
    }
  }
}
