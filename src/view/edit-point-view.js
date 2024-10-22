import { capitalize } from '../utils/utils.js';
import { getDestinationId, humanizePointDate } from '../utils/common.js';
import { DATE_WITH_TIME_FORMAT, TYPES } from '../const.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import he from 'he';

const createOfferClass = (offerTitle) => {
  const offerTitleSplitArray = offerTitle.split(' ');
  if (offerTitleSplitArray.length > 2) {
    return offerTitleSplitArray.slice(-2).join('-');
  }
  return offerTitleSplitArray.slice(-1);
};

const getDestinationPicture = (picture) => `<img class="event__photo" src=${picture.src} alt="${picture.description}">`;

const createDestinationsList = (destination) =>
  `<option value="${destination}"></option>`;

const createPointTypeItem = (pointType, pointTypeChecked) => `
  <div class="event__type-item">
  <input id="event-type-${pointType}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${pointType}" ${pointTypeChecked}>
  <label class="event__type-label  event__type-label--${pointType}" for="event-type-${pointType}-1">${capitalize(pointType)}</label>
  </div>`;

const getPointOfferItem = (pointOffer, pointOfferChecked, offerId) => `<div class="event__offer-selector">
  <input class="event__offer-checkbox  visually-hidden" id="event-offer-${createOfferClass(pointOffer.title)}-1" type="checkbox" name="event-offer-${createOfferClass(pointOffer.title)}" data-type="${offerId}" ${pointOfferChecked}>
  <label class="event__offer-label" for="event-offer-${createOfferClass(pointOffer.title)}-1" data-type="${offerId}">
    <span class="event__offer-title">${pointOffer.title}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${pointOffer.price}</span>
  </label>
  </div>`;

const getFormButtons = (isNewPoint, isDisabled, isSaving, isDeleting) => {
  const getDisabledState = () => isDisabled ? 'disabled' : '';

  const getButtonName = () => {
    if (!isDeleting) {
      return isNewPoint ? 'Cancel' : 'Delete';
    }
    return !isNewPoint && isDeleting ? 'Deleting...' : 'Delete';
  };

  return `<button class="event__save-btn  btn  btn--blue" type="submit"${getDisabledState()} >${isSaving ? 'Saving...' : 'Save'}</button>
        <button class="event__reset-btn" type="reset">${getButtonName()}</button>
        ${isNewPoint ? '' : ` <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
      </button>`}`;
};

const getPicturesItem = (pictures) => {
  if (pictures.length === 0) {
    return '';
  }
  return ` <div class="event__photos-container">
  <div class="event__photos-tape">
  ${pictures.map((picture) => getDestinationPicture(picture)).join('')}
  </div>
  </div>`;
};

const getDestinationInfo = (description, pictures) => {
  if (description !== '') {
    return `<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${he.encode(description)}</p>
      ${getPicturesItem(pictures)}
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

function createEditPointTemplate(point, offers, destinations, isNewPoint) {
  const { type, destination, dateFrom, dateTo, basePrice, offers: pointOffers, isDisabled, isSaving, isDeleting } = point;
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

  return `<li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1" >
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox" ${isDisabled ? 'disabled' : ''}>
        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>
            ${TYPES.map((pointType) => createPointTypeItem(pointType, isTypeChecked(pointType))).join('')}
          </fieldset>
        </div>
      </div>
      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
          ${type}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${modifiedDestination}" list="destination-list-1" required ${isDisabled ? 'disabled' : ''}>
        <datalist id="destination-list-1">
          ${destinations.map((destinationElement) => createDestinationsList(destinationElement.name)).join('') ?? ''}
        </datalist>
      </div>
      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${humanizePointDate(dateFrom, DATE_WITH_TIME_FORMAT)}" ${isDisabled ? 'disabled' : ''}>
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${humanizePointDate(dateTo, DATE_WITH_TIME_FORMAT)}" ${isDisabled ? 'disabled' : ''}>
      </div>
      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}" required ${isDisabled ? 'disabled' : ''}>
      </div>
      ${getFormButtons(isNewPoint, isDisabled, isSaving, isDeleting)}
        <span class="visually-hidden">Open event</span>
      </button>
    </header>
    <section class="event__details">
    ${getOffersInfo(allOffers, pointOffers) ?? ''}
    ${getDestinationInfo(description, pictures) ?? ''}
    </section>
  </form>
</li>`;
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

  constructor({ point, offers, destinations, onEditClick, onFormSaveClick, onFormDeleteClick, isNewPoint }) {
    super();
    this._setState(EditPointView.parsePointToState(point));
    this.#offers = offers;
    this.#destinations = destinations;
    this.#handleEditClick = onEditClick;
    this.#handleFormSave = onFormSaveClick;
    this.#handleFormDelete = onFormDeleteClick;
    this.#isNewPoint = isNewPoint;

    this._restoreHandlers();

  }

  _restoreHandlers() {
    if (!this.#isNewPoint) {
      this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
    }

    this.element.querySelector('form').addEventListener('submit', this.#formSaveHandler);
    this.element.querySelector('form').addEventListener('reset', this.#formDeleteHandler);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#formTypeChangeHandler);
    this.element.querySelectorAll('.event__offer-label').forEach((element) => element.addEventListener('click', this.#offersChooseHandler));
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

  reset(point) {
    this.updateElement(
      EditPointView.parsePointToState(point)
    );
  }

  get template() {
    return createEditPointTemplate(this._state, this.#offers, this.#destinations, this.#isNewPoint);
  }

  static parsePointToState(point) {
    return {
      ...point,
      isDisabled: false,
      isSaving: false,
      isDeleting: false
    };
  }

  static parseStateToPoint(state) {
    const point = { ...state };

    delete point.isDisabled;
    delete point.isSaving;
    delete point.isDeleting;

    return point;
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
    const targetPrice = Number(evt.target.value);

    if (!Number.isFinite(targetPrice)) {
      evt.target.value = '';
      return;
    }
    this.updateElement(({
      basePrice: targetPrice,
    }));
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

    // if (evt.target.tagName !== 'INPUT') {
    //   return;
    // }

    let updatedOffers = [];
    const newOffer = evt.currentTarget.dataset.type;
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
        onClose: this.#dateFromChangeHandler,
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
        onClose: this.#dateToChangeHandler,
      }
    );
  }
}
