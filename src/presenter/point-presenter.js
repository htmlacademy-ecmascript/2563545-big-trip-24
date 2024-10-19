import { render, replace, remove } from '../framework/render';
import PointView from '../view/point-view.js';
import EditPointView from '../view/edit-point-view.js';
import { Mode } from '../const.js';

export default class PointPresenter {
  #pointContainer = null;
  #pointComponent = null;
  #editPointComponent = null;

  #points = null;
  #offers = null;
  #destinations = null;

  #handlePointsChange = null;
  #handleModeChange = null;
  #clearPoint = null;
  #resetPointView = null;
  #mode = Mode.DEFAULT;

  constructor({ pointContainer, onPointsChange, onModeChange, onPointClear, onEditPointView }) {
    this.#pointContainer = pointContainer;
    this.#handlePointsChange = onPointsChange;
    this.#handleModeChange = onModeChange;
    this.#clearPoint = onPointClear;
    this.#resetPointView = onEditPointView;
  }

  init(points, offers, destinations) {
    this.#points = points;
    this.#offers = offers;
    this.#destinations = destinations;

    const prevPointComponent = this.#pointComponent;
    const prevEditPointComponent = this.#editPointComponent;

    this.#pointComponent = new PointView({
      points: this.#points,
      offers: this.#offers,
      destinations: this.#destinations,

      onEditClick: () => {
        this.#replacePointToForm();
      },
      onFavoriteClick: this.#handleFavoriteClick
    });

    this.#editPointComponent = new EditPointView({
      points,
      offers,
      destinations,

      onEditClick: this.#handleEditClick,
      onFormSaveClick: this.#handleSaveClick,
      onFormDeleteClick: this.#handleDeleteClick,
    });

    if (prevPointComponent === null || prevEditPointComponent === null) {
      render(this.#pointComponent, this.#pointContainer.element());
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
      this.#editPointComponent.reset(this.#points);
      this.#replaceFormToPoint();
    }
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceFormToPoint();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };

  #handleFavoriteClick = () => {
    this.#handlePointsChange({ ...this.#points, isFavorite: !this.#points.isFavorite });
  };

  #handleEditClick = (point) => {
    this.#resetPointView(point);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #handleSaveClick = (point) => {
    this.#handlePointsChange(point);
    this.#replaceFormToPoint();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #handleDeleteClick = (point) => {
    this.#clearPoint(point);
    this.#replaceFormToPoint();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };
}
