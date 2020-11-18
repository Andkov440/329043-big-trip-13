import {createInfoTemplate} from "./view/info.js";
import {createMenuTemplate} from "./view/menu.js";
import {createFilterTemplate} from "./view/filter.js";
import {createSortTemplate} from "./view/sort.js";
import {createListTemplate} from "./view/list.js";
import {createEventTemplate} from "./view/event.js";
// import {createEventCreateTemplate} from "./view/event-create.js";
import {createEventEditTemplate} from "./view/event-edit.js";

const EVENTS_COUNT = 3;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const tripMainElement = document.querySelector(`.trip-main`);
const tripEventsElement = document.querySelector(`.trip-events`);

const siteMenuElement = tripMainElement.querySelector(`.trip-controls`);

render(tripMainElement, createInfoTemplate(), `afterbegin`);

render(siteMenuElement, createMenuTemplate(), `beforeend`);
render(siteMenuElement, createFilterTemplate(), `beforeend`);

render(tripEventsElement, createSortTemplate(), `beforeend`);
render(tripEventsElement, createListTemplate(), `beforeend`);

const tripEventsListElement = tripEventsElement.querySelector(`.trip-events__list`);
// const tripEventsItemElement = tripEventsListElement.querySelector(`.trip-events__item`);

render(tripEventsListElement, createEventEditTemplate(), `afterbegin`);

for (let i = 0; i < EVENTS_COUNT; i++) {
  render(tripEventsListElement, createEventTemplate(), `beforeend`);
}



