import dayjs from 'dayjs';
import {createElement} from "../utils.js";

const createInfoTemplate = (events) => {
  const destinationPointList = events.map((item) => item.destinationPoint);
  const startTimeList = events.map((item) => item.starttime);
  const endTimeList = events.map((item) => item.endtime);
  const priceList = events.map((item) => item.eventPrice);
  const total = priceList.reduce((accumulator, currentValue) => {
    return accumulator + +currentValue;
  }, 0);

  return `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${(destinationPointList.length > 3) ? (destinationPointList[0] + ` &mdash; ... &mdash; ` + destinationPointList[destinationPointList.length - 1]) : destinationPointList.join(` &mdash; `)}</h1>
      <p class="trip-info__dates">${dayjs.unix(startTimeList[0]).format(`MMM DD`) + `&nbsp;&mdash;&nbsp;` + dayjs.unix(endTimeList[endTimeList.length - 1]).format(`DD`)}</p>
    </div>

    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${total}</span>
    </p>
  </section>`;
};

export default class SiteInfo {
  constructor(events) {
    this._events = events;
    this._element = null;
  }

  getTemplate() {
    return createInfoTemplate(this._events);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

