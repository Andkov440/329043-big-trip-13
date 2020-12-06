import AbstractView from "./abstract.js";

const createListTemplate = () => {
  return `<ul class="trip-events__list"></ul>`;
};

export default class EventList extends AbstractView {
  getTemplate() {
    return createListTemplate();
  }
}
