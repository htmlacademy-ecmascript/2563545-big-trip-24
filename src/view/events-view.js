import { createElement } from '../render';

function createEventsViewTemplate() {
  return '<ul class="trip-events__list"></ul>';
}

export default class EventsView {
  getTemplate() {
    return createEventsViewTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}