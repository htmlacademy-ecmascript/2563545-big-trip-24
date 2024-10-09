import AbstractView from '../framework/view/abstract-view.js';
import { getFullDateIncompleteYear } from '../utils/utils.js';
import { POINT_TYPES } from '../const.js';

function createAddPointViewTemplate(points, destinations) {
  const { basePrice, dateFrom, dateTo, type } = points;
  const pointDestinations = destinations.find((des) => des.id === points.destination);
  return (
    `<li class="trip-events__item">
              <form class="event event--edit" action="#" method="post">
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
                    <label class="event__label  event__type-output" for="event-destination-1">
                      ${type}
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="Geneva" list="destination-list-1">
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
                  <button class="event__reset-btn" type="reset">Cancel</button>
                </header>

                <section class="event__details">
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
              </form>
            </li>`
  );
}

export default class AddPointView extends AbstractView {
  #points = null;
  #destinations = null;

  constructor({points, destinations}) {
    super();
    this.#points = points;
    this.#destinations = destinations;
  }

  get template() {
    return createAddPointViewTemplate(this.#points, this.#destinations);
  }
}
