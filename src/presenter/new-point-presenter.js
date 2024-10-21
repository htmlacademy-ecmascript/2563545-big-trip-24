import { BLANK_POINT, UpdateType, UserAction } from '../const.js';
import { render, remove, RenderPosition } from '../framework/render.js';
import EditPointView from '../view/edit-point-view.js';

export default class NewPointPresenter {
  #point = BLANK_POINT;
  #pointsContainer = null;
  #handlePointAdd = null;
  #handleDestroy = null;

  #editPointComponent = null;

  // #offers = [];
  // #destinations = [];
  #modelDestinations = null;
  #modelOffers = null;

  constructor({ pointsContainer, onPointAdd, onDestroy, modelOffers, modelDestinations }) {
    this.#pointsContainer = pointsContainer;
    this.#handlePointAdd = onPointAdd;
    this.#handleDestroy = onDestroy;
    this.#modelDestinations = modelDestinations;
    this.#modelOffers = modelOffers;
  }

  // init(offers, destinations) {
    init() {
    
    // this.#offers = offers;
    // this.#destinations = destinations;
    if (this.#editPointComponent !== null) {
      return;
    }

    this.#editPointComponent = new EditPointView({
      // point: BLANK_POINT,
      point: this.#point,
      // offers: this.#offers,
      // destinations: this.#destinations,
      destinations: this.#modelDestinations.destinations,
      offers: this.#modelOffers.offers,
      onFormSaveClick: this.#handleFormSaveClick,
      onFormDeleteClick: this.#handleFormDeleteClick,
      isNewPoint: true
    });

    render(this.#editPointComponent, this.#pointsContainer, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    if (this.#editPointComponent === null) {
      return;
    }

    this.#handleDestroy();

    remove(this.#editPointComponent);

    this.#editPointComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  setSaving() {
    this.#editPointComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  }

  setAborting() {
    const resetFormState = () => {
      this.#editPointComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#editPointComponent.shake(resetFormState);
  }

  #handleFormSaveClick = (point) => {
    this.#handlePointAdd(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      point,
    );
    this.destroy();
  };

  #handleFormDeleteClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.destroy();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };
}
