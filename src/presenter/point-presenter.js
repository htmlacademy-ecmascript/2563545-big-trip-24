import { render, replace, remove } from '../framework/render';
import PointView from '../view/point-view.js';
import EditPointView from '../view/edit-point-view.js';
import { Mode, UpdateType, UserAction } from '../const.js';

export default class PointPresenter {
  #eventsComponent = null;
  #pointComponent = null;
  #editPointComponent = null;

  #point = null;
  #offers = [];
  #destinations = [];

  #handleModelEvent = null;
  #handleModeChange = null;
  #clearPoint = null;
  #resetPointView = null;
  #handleModelUpdate = null;

  #mode = Mode.DEFAULT;

  constructor({ eventsComponent, onPointsChange, onModeChange, onPointClear, onEditPointView, onModelUpdate }) {
    this.#eventsComponent = eventsComponent;
    this.#handleModelEvent = onPointsChange;
    this.#handleModeChange = onModeChange;
    this.#clearPoint = onPointClear;
    this.#resetPointView = onEditPointView;
    this.#handleModelUpdate = onModelUpdate;
  }

  init(point, offers, destinations) {
    this.#point = point;
    this.#offers = offers;
    this.#destinations = destinations;

    const prevPointComponent = this.#pointComponent;
    const prevEditPointComponent = this.#editPointComponent;

    this.#pointComponent = new PointView({
      point: this.#point,
      offers: this.#offers,
      destinations: this.#destinations,

      onEditClick: () => {
        this.#replacePointToForm();
      },
      onFavoriteClick: this.#handleFavoriteClick
    });

    this.#editPointComponent = new EditPointView({
      point: this.#point,
      offers: this.#offers,
      destinations: this.#destinations,

      onEditClick: this.#handleEditClick,
      onFormSaveClick: this.#handleSaveClick,
      onFormDeleteClick: this.#handleDeleteClick,
    });

    if (prevPointComponent === null || prevEditPointComponent === null) {
      render(this.#pointComponent, this.#eventsComponent.element());
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === Mode.EDIT) {
      replace(this.#editPointComponent, prevEditPointComponent);
    }

    remove(prevPointComponent);
    remove(prevEditPointComponent);
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#editPointComponent);
  }

  #replacePointToForm() {
    replace(this.#editPointComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#handleModeChange();
    this.#mode = Mode.EDIT;
  }

  #replaceFormToPoint() {
    replace(this.#pointComponent, this.#editPointComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  }

  resetView(){
    if (this.#mode !== Mode.DEFAULT){
      this.#editPointComponent.reset(this.#point);
      this.#replaceFormToPoint();
    }
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#editPointComponent.reset(this.#point);
      this.#replaceFormToPoint();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };

  #handleFavoriteClick = () => {
    this.#handleModelEvent({ ...this.#point, isFavorite: !this.#point.isFavorite });
  };

  #handleEditClick = (point) => {
    this.#resetPointView(point);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #handleSaveClick = (point) => {
    this.#handleModelUpdate(UserAction.UPDATE_POINT, UpdateType.MINOR, point);
    this.#replaceFormToPoint();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #handleDeleteClick = (point) => {
    this.#clearPoint(point);
    this.#replaceFormToPoint();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };
}
