import AbstractView from '../framework/view/abstract-view.js';
import { getFullDateIncompleteYear } from '../utils/utils.js';
import { POINT_TYPES } from '../const.js';

function createEditPointViewTemplate(points, offers, destinations) {
  const { basePrice, dateFrom, dateTo, type } = points;
  const typeOffers = offers.find((off) => off.type === points.type).offers;
  const pointOffers = typeOffers.filter((typeOffer) => points.offers.includes(typeOffer.id));
  const pointDestinations = destinations.find((des) => des.id === points.destination);
  return (
    `<form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-${points.id}">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${points.id}" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>
            ${POINT_TYPES.map((typePoint) => (`<div class="event__type-item">
              <input id="event-type-${typePoint}-${points.id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${typePoint}" ${typePoint === type ? 'checked' : ''}>
              <label class="event__type-label  event__type-label--${typePoint}" for="event-type-${typePoint}-${points.id}">${typePoint}</label>
            </div>`)).join('')}
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-${points.id}">
          ${type}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-${points.id}" type="text" name="event-destination" value="${pointDestinations.name}" list="destination-list-${points.id}">
        <datalist id="destination-list-${points.id}">
          <option value="Amsterdam"></option>
          <option value="Geneva"></option>
          <option value="Chamonix"></option>
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-${points.id}" type="text" name="event-start-time" value="${getFullDateIncompleteYear(dateFrom)}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-${points.id}" type="text" name="event-end-time" value="${getFullDateIncompleteYear(dateTo)}">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-${points.id}">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-${points.id}" type="text" name="event-price" value="${basePrice}">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Delete</button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </header>
    <section class="event__details">
      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>
        <div class="event__available-offers">
        ${typeOffers.map((typeOffer) => (`<div class="event__offer-selector">
            <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-${points.id}" type="checkbox" name="event-offer-luggage" ${pointOffers.map((off) => off.id).includes(typeOffer.id) ? 'checked' : ''}>
            <label class="event__offer-label" for="event-offer-luggage-${points.id}">
              <span class="event__offer-title">${typeOffer.title}</span>
              &plus;&euro;&nbsp;
              <span class="event__offer-price">${typeOffer.price}</span>
            </label>
          </div>`)).join('')}
      </section>

      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${pointDestinations.description}</p>

        <div class="event__photos-container">
          <div class="event__photos-tape">
          ${pointDestinations.pictures.map((picture) => (`
            <img class="event__photo" src="${picture.src}" alt="${picture.description}"></img>
          `))}
          </div>
        </div>
      </section>
    </section>
  </form>`);
}

export default class EditPointView extends AbstractView {
  #points = null;
  #offers = null;
  #destinations = null;
  #handleEditClick = null;
  #handleFormSave = null;
  #handleFormDelete = null;

  constructor({points, offers, destinations, onEditClick, onFormSaveClick, onFormDeleteClick}) {
    super();
    this.#points = points;
    this.#offers = offers;
    this.#destinations = destinations;
    this.#handleEditClick = onEditClick;
    this.#handleFormSave = onFormSaveClick;
    this.#handleFormDelete = onFormDeleteClick;

    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
    this.element.querySelector('form').addEventListener('submit', this.#formSaveHandler);
    this.element.querySelector('form').addEventListener('reset', this.#formDeleteHandler);
  }

  get template() {
    return createEditPointViewTemplate(this.#points, this.#offers, this.#destinations);
  }

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditClick();
  };

  #formSaveHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSave();
  };

  #formDeleteHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormDelete();
  };
}
