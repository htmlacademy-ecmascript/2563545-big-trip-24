import { render, replace, remove } from '../framework/render';
import FiltersView from '../view/filter-view';
import { UpdateType } from '../const';
import { filter } from '../utils/filter';

export default class FiltersPresenter {
  #modelFilter = null;
  #filtersContainer = null;
  #modelPoints = null;

  #filtersComponent = null;

  constructor({ filtersContainer, pointModel, filtersModel }) {
    this.#filtersContainer = filtersContainer;
    this.#modelPoints = pointModel;
    this.#modelFilter = filtersModel;

    this.#modelPoints.addObserver(this.#handleModelEvent);
    this.#modelFilter.addObserver(this.#handleModelEvent);
  }

  get filters() {
    const points = this.#modelPoints.points;

    return Object.entries(filter).map(
      ([filterType, filterPoints]) => ({
        type: filterType,
        count: filterPoints(points).length,
      }),
    );
  }

  init() {
    const prevFiltersComponent = this.#filtersComponent;

    this.#filtersComponent = new FiltersView({
      filters: this.filters,
      onFiltersChange: this.#handleFiltersChange
    });

    if (prevFiltersComponent === null) {
      render(this.#filtersComponent, this.#filtersContainer);
      return;
    }

    replace(this.#filtersComponent, prevFiltersComponent);
    remove(prevFiltersComponent);
  }

  #handleModelEvent = () => {
    this.init();
  };

  #handleFiltersChange = (filterType) => {
    if (this.#modelFilter.filter === filterType) {
      return;
    }

    this.#modelFilter.setFilter(UpdateType.MAJOR, filterType);
  };
}
