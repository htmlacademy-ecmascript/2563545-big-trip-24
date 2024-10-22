import { render, replace, remove } from '../framework/render';
import FiltersView from '../view/filter-view';
import { UpdateType } from '../const';
import { filter } from '../utils/filter';

export default class FiltersPresenter {
  #modelFilters = null;
  #filtersComponent = null;
  #filtersContainer = null;
  #modelPoints = null;

  constructor({ filtersContainer, modelPoints, modelFilters }) {
    this.#filtersContainer = filtersContainer;
    this.#modelPoints = modelPoints;
    this.#modelFilters = modelFilters;

    this.#modelPoints.addObserver(this.#handleModelEvent);
    this.#modelFilters.addObserver(this.#handleModelEvent);
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
      onFiltersChange: this.#handleFiltersChange,
      currentFilter: this.#modelFilters.filter,
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
    if (this.#modelFilters.filter === filterType) {
      return;
    }

    this.#modelFilters.setFilter(UpdateType.MAJOR, filterType);
  };
}
