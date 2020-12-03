import {createElement} from "../utils.js";

const createTripTemplate = () => {
  return `<section class="trip-events"></section>`;
};

export default class Trip {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createTripTemplate();
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
