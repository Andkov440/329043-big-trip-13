import AbstractView from "./abstract.js";
import dayjs from 'dayjs';
import {getDuration} from "../utils/event.js";

const getOffer = (arr) => {
  return arr.map((item) => `<li class="event__offer">
  <span class="event__offer-title">${item.name}</span>
  &plus;&euro;&nbsp;
  <span class="event__offer-price">${item.price}</span>
  </li>`).join(` `);
};

const createEventTemplate = (event) => {
  const {eventType, eventOffers, destinationPoint, starttime, endtime, eventPrice, isFavorite} = event;
  // console.log(event);

  const offer = getOffer(eventOffers);

  // const isActive = isFavorite ? `active` : ``;
  const favoriteClassName = isFavorite
    ? `event__favorite-btn event__favorite-btn--active`
    : `event__favorite-btn`;

  return `<li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="${dayjs.unix(starttime).format(`YYYY-MM-D`)}">${dayjs.unix(starttime).format(`MMM DD`)}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${eventType}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${eventType} ${destinationPoint}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${dayjs.unix(starttime).format(`YYYY-MM-DDTHH:mm`)}">${dayjs.unix(starttime).format(`HH:mm`)}</time>
          &mdash;
          <time class="event__end-time" datetime="${dayjs.unix(endtime).format(`YYYY-MM-DDTHH:mm`)}">${dayjs.unix(endtime).format(`HH:mm`)}</time>
        </p>
        <p class="event__duration">${getDuration(starttime, endtime)}</p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${eventPrice}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${offer}
      </ul>
      <button class="${favoriteClassName} " type="button">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`;
};

export default class Event extends AbstractView {
  constructor(event) {
    super();
    this._event = event;

    this._formEditHandler = this._formEditHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
  }

  getTemplate() {
    return createEventTemplate(this._event);
  }

  _formEditHandler(evt) {
    evt.preventDefault();
    this._callback.formEdit();
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector(`.event__favorite-btn`).addEventListener(`click`, this._favoriteClickHandler);
  }

  setFormEditHandler(callback) {
    this._callback.formEdit = callback;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._formEditHandler);
    this.getElement().querySelector(`.event__rollup-btn`).classList.toggle(`event__rollup-open`);
  }
}
