import AbstractView from '../framework/view/abstract-view';

function createFailedToLoadTemplate() {
  return '<p class="trip-events__msg">Failed to load latest route information</p>';
}

export default class FailedToLoadView extends AbstractView {
  get template() {
    return createFailedToLoadTemplate();
  }
}
