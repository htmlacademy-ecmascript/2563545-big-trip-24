import { BLANK_POINT, UpdateType, UserAction } from '../const';
import { render, remove, RenderPosition } from '../framework/render';
import EditPointView from '../view/edit-point-view';

export default class NewPointPresenter {
  #pointsListContainer = null;
  #editPointComponent = null;
  #handlePointAdd = null;
  #handleDestroy = null;
  #offers = [];
  #destinations = [];

  constructor({ pointsListContainer, onPointAdd, onDestroy }) {
    this.#pointsListContainer = pointsListContainer;
    this.#handlePointAdd = onPointAdd;
    this.#handleDestroy = onDestroy;
  }

  init(offers, destinations) {
    this.#offers = offers;
    this.#destinations = destinations;

    if (this.#editPointComponent !== null) {
      return;
    }

    this.#editPointComponent = new EditPointView({
      point: BLANK_POINT,
      offers: this.#offers,
      destinations: this.#destinations,
      onFormSaveClick: this.#handleFormSaveClick,
      onFormDeleteClick: this.#handleFormDeleteClick,
      isNewPoint: true
    });

    render(this.#editPointComponent, this.#pointsListContainer, RenderPosition.AFTERBEGIN);

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
  };

  #handleFormDeleteClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };
}