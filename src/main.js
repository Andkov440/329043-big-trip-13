import {render} from "./view/utils.js";
import {createInfoTemplate} from "./view/info.js";
import {createMenuTemplate} from "./view/menu.js";
import {createFilterTemplate} from "./view/filter.js";
import {createSortTemplate} from "./view/sort.js";
import {createListTemplate} from "./view/list.js";
import {createEventTemplate} from "./view/event.js";
import {createEventEditTemplate} from "./view/event-edit.js";
import {generateEvent} from "./mock/event.js";

const EVENTS_COUNT = 5;

const events = new Array(EVENTS_COUNT).fill().map(generateEvent);

const tripMainElement = document.querySelector(`.trip-main`);
const tripEventsElement = document.querySelector(`.trip-events`);

const siteMenuElement = tripMainElement.querySelector(`.trip-controls`);

render(tripMainElement, createInfoTemplate(events), `afterbegin`);

render(siteMenuElement, createMenuTemplate(), `beforeend`);
render(siteMenuElement, createFilterTemplate(), `beforeend`);

render(tripEventsElement, createSortTemplate(), `beforeend`);
render(tripEventsElement, createListTemplate(), `beforeend`);

const tripEventsListElement = tripEventsElement.querySelector(`.trip-events__list`);

render(tripEventsListElement, createEventEditTemplate(events[0]), `afterbegin`);

for (let i = 0; i < EVENTS_COUNT; i++) {
  render(tripEventsListElement, createEventTemplate(events[i]), `beforeend`);
}
