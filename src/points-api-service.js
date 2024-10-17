import ApiService from './framework/api-service';
import { Method, URL } from './const';

export default class PointsApiService extends ApiService {
  get points() {
    return this._load({url: URL.POINTS}) // загрузка данных с сервера
      .then(ApiService.parseResponse); // преобразуем строку к объекту чтобы с ним далее работать
  }

  get destinations() {
    return this._load({url: URL.DESTINATIONS})
      .then(ApiService.parseResponse);
  }

  get offers() {
    return this._load({url: URL.OFFERS})
      .then(ApiService.parseResponse);
  }

  async updatePoint(points) {
    const response = await this._load({
      url: `${URL.POINTS}/${points.id}`,
      method: Method.PUT,
      body: JSON.stringify(this.#adaptToServer(points)),
      headers: new Headers({ 'Content-Type': 'application/json' })
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  #adaptToServer(point) {
    const adaptedPoint = {...point,
      'date_from': point.dateFrom instanceof Date ? point.dateFrom.toISOString() : null,
      'date_to': point.dateTo instanceof Date ? point.dateTo.toISOString() : null,
      'base_price': point.basePrice,
      'is_favorite': point.isFavorite,
    };

    delete adaptedPoint.dateFrom;
    delete adaptedPoint.dateTo;
    delete adaptedPoint.basePrice;
    delete adaptedPoint.isFavorite;

    return adaptedPoint;
  }
}
