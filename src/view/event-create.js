import dayjs from 'dayjs';
import AbstractView from "./abstract.js";
import {eventTypes} from "../view/utils.js";

const getEventTypesList = (arr) => {
  return arr.map((item) => `<div class="event__type-item">
<input id="event-type-${item.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${item.toLowerCase()}">
<label class="event__type-label  event__type-label--${item.toLowerCase()}" for="event-type-${item.toLowerCase()}-1">${item}</label>
</div>`).join(``);
};

const getDestinationPointList = (arr) => {
  return arr.map((item) => `<option value="${item.destinationPoint}"></option>`).join(``);
};

const getOfferList = (arr) => {
  return arr.map((item) => `<div class="event__offer-selector">
  <input class="event__offer-checkbox  visually-hidden" id="event-offer-${item.type}-1" type="checkbox" name="event-offer-${item.type}" ${item.checked ? `checked` : ``}>
  <label class="event__offer-label" for="event-offer-${item.type}-1">
    <span class="event__offer-title">${item.name}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${item.price}</span>
  </label>
</div>`).join(``);
};

const getPhotoList = (arr) => {
  return arr.map((item) => `<img class="event__photo" src="${item}" alt="Event photo">`).join(``);
};

const createEventCreateTemplate = (events) => {
  const {eventType, destinationPoint, starttime, endtime, eventPrice, description, photo, eventOffers} = events[0];

  const eventTypesList = getEventTypesList(eventTypes);
  const destinationPointList = getDestinationPointList(events);
  const offerList = getOfferList(eventOffers);
  const photoList = getPhotoList(photo);

  return `<li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${eventType}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>
            ${eventTypesList}
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
        ${eventType}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destinationPoint}" list="destination-list-1">
        <datalist id="destination-list-1">
        ${destinationPointList}
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dayjs.unix(starttime).format(`DD/MM/YY HH:mm`)}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dayjs.unix(endtime).format(`DD/MM/YY HH:mm`)}">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${eventPrice}">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Delete</button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </header>
    <section class="event__details">
      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>

        <div class="event__available-offers">
        ${offerList}
        </div>
      </section>

      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${description}</p>
      <div class="event__photos-container">
        <div class="event__photos-tape">
          ${photoList}
        </div>
      </div>
    </section>
  </section>
</form>`;
};

export default class EventCreate extends AbstractView {
  constructor(events) {
    super();
    this._events = events;
  }

  getTemplate() {
    return createEventCreateTemplate(this._events);
  }
}
