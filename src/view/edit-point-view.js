import { capitalize, getDestinationId, humanizePointDate } from '../utils/utils.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import { DATE_WITH_TIME_FORMAT, POINT_TYPES } from '../const.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import he from 'he';

const createOfferClass = (offerTitle) => {
  const offerTitleSplitArray = offerTitle.split(' ');
  return offerTitleSplitArray[offerTitleSplitArray.length - 1];
};

const getDestinationPicture = (picture) => `<img class="event__photo" src=${picture.src} alt="${picture.description}">`;

const createDestinationsList = (destination) =>
  `<option value="${destination}"></option>`;

const createPointTypeItem = (pointType, pointTypeChecked) =>
  `<div class="event__type-item">
  <input id="event-type-${pointType}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${pointType}" ${pointTypeChecked}>
  <label class="event__type-label  event__type-label--${pointType}" for="event-type-${pointType}-1">${capitalize(pointType)}</label>
  </div>`;

const getPointOfferItem = (pointOffer, pointOfferChecked, offerId) =>
  `<div class="event__offer-item">
  <input class="event__offer-checkbox  visually-hidden" id="event-offer-${createOfferClass(pointOffer.title)}-1" type="checkbox" data-type="${offerId}" name="event-offer-${createOfferClass(pointOffer.title)}" ${pointOfferChecked}>
  <label class="event__offer-label" for="event-offer-${createOfferClass(pointOffer.title)}-1">
    <span class="event__offer-title">${pointOffer.title}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${pointOffer.price}</span>
  </label>
  </div>`;

const getFormButtons = (isNewPoint) => {
  if (isNewPoint) {
    return `<button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Cancel</button>`;
  }
  return `<button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Delete</button>
      <button class="event__rollup-btn" type="button">`;
};

const getDestinationInfo = (description, pictures) => {
  if (description !== '') {
    return `<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${he.encode(description)}</p>
      <div class="event__photos-container">
      <div class="event__photos-tape">
      ${pictures.map((picture) => getDestinationPicture(picture)).join('')}
      </div>
      </div>
      </section>`;
  }
};

const getOfferCheckedAttribute = (pointOffers, offerId) => {
  if (pointOffers.includes(offerId)) {
    return 'checked';
  }
  return '';
};

const getOffersInfo = (allOffers, pointOffers) => {
  if (allOffers.length > 0) {
    return `<section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
    <div class="event__available-offers">
    ${allOffers.map((pointOffer) => getPointOfferItem(pointOffer, getOfferCheckedAttribute(pointOffers, pointOffer.id), pointOffer.id)).join('')}
    </div>
    </section>`;
  }
};

function createEditPointViewTemplate(points, offers, destinations, isNewPoint) {
  const { basePrice, dateFrom, dateTo, type, destination, offers: pointOffers } = points;
  let modifiedDestination = '';
  let description = '';
  let pictures = [];

  if (destination !== null) {
    modifiedDestination = destinations.find((destinationElement) => destinationElement.id === destination).name;
    description = destinations.find((destinationElement) => destinationElement.id === destination).description;
    pictures = destinations.find((destinationElement) => destinationElement.id === destination).pictures;
  }

  const allOffers = offers.find((offer) => offer.type === type).offers;

  const isTypeChecked = (pointType) => {
    if (pointType === type) {
      return 'checked';
    }
    return '';
  };

  return (
    `<form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>
            ${POINT_TYPES.map((pointType) => createPointTypeItem(pointType, isTypeChecked(pointType))).join('')}
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
          ${type}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${modifiedDestination.name}" list="destination-list-1">
        <datalist id="destination-list-1">
        ${destinations.map((destinationElement) => createDestinationsList(destinationElement.name)).join('') ?? ''}
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${humanizePointDate(dateFrom, DATE_WITH_TIME_FORMAT)}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${humanizePointDate(dateTo, DATE_WITH_TIME_FORMAT)}">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-${points.id}" type="text" name="event-price" value="${basePrice}">
      </div>
     ${getFormButtons(isNewPoint)}
        <span class="visually-hidden">Open event</span>
      </button>
    </header>
    <section class="event__details">
    ${getOffersInfo(allOffers, pointOffers) ?? ''}
    ${getDestinationInfo(description, pictures) ?? ''}
    </section>
  </form>`);
}

export default class EditPointView extends AbstractStatefulView {
  #offers = null;
  #destinations = null;
  #handleEditClick = null;
  #handleFormSave = null;
  #handleFormDelete = null;
  #dateFromPicker = null;
  #dateToPicker = null;
  #isNewPoint = null;
  _state = {};

  constructor({points, offers, destinations, onEditClick, onFormSaveClick, onFormDeleteClick, isNewPoint }) {
    super();
    this._setState(EditPointView.parsePointToState(points));
    this.#offers = offers;
    this.#destinations = destinations;
    this.#handleEditClick = onEditClick;
    this.#handleFormSave = onFormSaveClick;
    this.#handleFormDelete = onFormDeleteClick;
    this.#isNewPoint = isNewPoint;

    if (!this.#isNewPoint) {
      this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
    }
    this.element.querySelector('form').addEventListener('submit', this.#formSaveHandler);
    this.element.querySelector('form').addEventListener('reset', this.#formDeleteHandler);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#formTypeChangeHandler);

    if (this.element.querySelector('.event__available-offers')) {
      this.element.querySelector('.event__available-offers').addEventListener('change', this.#offersChooseHandler);
    }

    this.element.querySelector('.event__input--price').addEventListener('change', this.#formPriceInputHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#formDestinationChangeHandler);

    this.#setDateFromPicker();
    this.#setDateToPicker();
  }

  removeElement() {
    super.removeElement();

    if (this.#dateFromPicker) {
      this.#dateFromPicker.destroy();
      this.#dateFromPicker = null;
    }

    if (this.#dateToPicker) {
      this.#dateToPicker.destroy();
      this.#dateToPicker = null;
    }
  }

  reset(points) {
    this.updateElement(
      EditPointView.parsePointToState(points)
    );
  }

  get template() {
    return createEditPointViewTemplate(this._state, this.#offers, this.#destinations);
  }

  static parsePointToState(point) {
    return { ...point };
  }

  static parseStateToPoint(state) {
    return { ...state };
  }

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditClick(EditPointView.parseStateToPoint(this._state));
  };

  #formSaveHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSave(EditPointView.parseStateToPoint(this._state));
  };

  #formDeleteHandler = (evt) => {
    evt.preventDefault();
    if (this.#isNewPoint) {
      this.#handleFormDelete();
    } else {
      this.#handleFormDelete(EditPointView.parseStateToPoint(this._state));
    }
  };

  #formPriceInputHandler = (evt) => {
    evt.preventDefault();
    if (Number.isFinite(Number(evt.target.value))) {
      this.updateElement(({
        basePrice: Number(evt.target.value),
      }));
      return;
    }
    evt.target.value = '';
  };

  #formTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this.updateElement(({
      type: evt.target.value,
      offers: [],
    }));
  };

  #offersChooseHandler = (evt) => {
    evt.preventDefault();

    if (evt.target.tagName !== 'INPUT') {
      return;
    }

    let updatedOffers = [];
    const newOffer = evt.target.dataset.type;
    const isNewOfferInList = this._state.offers.find((offer) => offer === newOffer);

    if (isNewOfferInList) {
      updatedOffers = this._state.offers.filter((offer) => offer !== newOffer);
    } else {
      updatedOffers = this._state.offers.concat(newOffer);
    }

    this.updateElement({
      offers: updatedOffers,
    });
  };

  #formDestinationChangeHandler = (evt) => {
    evt.preventDefault();
    this.#destinations.forEach((destination) => {
      if (evt.target.value === destination.name) {
        this.updateElement(({
          destination: getDestinationId(evt.target.value, this.#destinations),
        }));
      }
    });
  };

  #dateFromChangeHandler = ([userDate]) => {
    this.updateElement({
      dateFrom: userDate,
    });
  };

  #dateToChangeHandler = ([userDate]) => {
    this.updateElement({
      dateTo: userDate,
    });
  };

  #setDateFromPicker() {
    this.#dateFromPicker = flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        'time_24hr': true,
        maxDate: humanizePointDate(this._state.dateTo, DATE_WITH_TIME_FORMAT),
        defaultDate: humanizePointDate(this._state.dateFrom, DATE_WITH_TIME_FORMAT),
        onChange: this.#dateFromChangeHandler,
      }
    );
  }

  #setDateToPicker() {
    this.#dateToPicker = flatpickr(
      this.element.querySelector('#event-end-time-1'),
      {
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        'time_24hr': true,
        minDate: humanizePointDate(this._state.dateFrom, DATE_WITH_TIME_FORMAT),
        defaultDate: humanizePointDate(this._state.dateTo, DATE_WITH_TIME_FORMAT),
        onChange: this.#dateToChangeHandler,
      }
    );
  }
}
