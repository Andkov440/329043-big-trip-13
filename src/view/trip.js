import AbstractView from "./abstract.js";

const createTripTemplate = () => {
  return `<section class="trip-events"></section>`;
};

export default class Trip extends AbstractView {
  getTemplate() {
    return createTripTemplate();
  }
}
