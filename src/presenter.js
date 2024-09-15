import AddPointView from './view/add-point-view.js';
import EditPointView from './view/edit-point-view.js';
import EventsView from './view/events-view.js';
import SortView from './view/sort-view.js';
import PointView from './view/point-view.js';

import {render} from './render.js';

export default class Presenter {
  eventsComponent = new EventsView();

  constructor({container}) {
    this.eventsContainer = container;
  }

  init() {
    render(this.eventsComponent, this.eventsContainer);
    render(new SortView(), this.eventsComponent.getElement());
    render(new EditPointView(), this.eventsComponent.getElement());
    render(new AddPointView(), this.eventsComponent.getElement());

    for (let i = 0; i < 3; i++) {
      render(new PointView(), this.eventsComponent.getElement());
    }
  }
}
