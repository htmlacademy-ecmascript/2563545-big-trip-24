import { capitalize } from '../utils/utils';
import AbstractView from '../framework/view/abstract-view';
import { SortType } from '../const';

const getSortItems = (sort, currentSortType) => `<div class="trip-sort__item  trip-sort__item--${sort}">
  <input
  id="sort-${sort}"
  class="trip-sort__input  visually-hidden"
  type="radio"
  name="trip-sort"
  value="sort-${sort}"
  ${sort === 'offer' || sort === 'event' ? 'disabled' : ''}
  ${sort === currentSortType ? 'checked' : ''}>
<label class="trip-sort__btn" for="sort-${sort}" data-sort-type="${sort}">${capitalize(sort)}</label>
</div>`;

function createSortTemplate(currentSortType) {
  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
  ${Object.values(SortType).map((sort) => getSortItems(sort, currentSortType)).join('')}
  </form>`;
}

export default class SortView extends AbstractView {
  #handleSortClick = null;
  #sortType = '';

  constructor({ onSortClick, sortType }) {
    super();
    this.#handleSortClick = onSortClick;
    this.#sortType = sortType;

    this.element.addEventListener('click', this.#sortClickHandler);
  }

  get template() {
    return createSortTemplate(this.#sortType);
  }

  #sortClickHandler = (evt) => {
    if (evt.target.tagName !== 'LABEL') {
      return;
    }

    evt.preventDefault();
    this.#handleSortClick(evt.target.dataset.sortType);
  };
}