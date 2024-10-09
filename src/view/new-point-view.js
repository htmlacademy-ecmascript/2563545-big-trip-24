import AbstractView from '../framework/view/abstract-view';

function createNewPointViewTemplate() {
  return '<p class="trip-events__msg">Click New Event to create your first point</p>';
}

export default class NewPointView extends AbstractView {
  get template() {
    return createNewPointViewTemplate();
  }
}
