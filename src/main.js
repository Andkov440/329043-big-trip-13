import SiteInfoView from "./view/info.js";
import NewEventButtonView from "./view/new-event-button.js";
import SiteMenuView from "./view/menu.js";
import FilterView from "./view/filter.js";
import SortView from "./view/sort.js";
import TripView from "./view/trip.js";
import EventListView from "./view/list.js";
import NoEventView from "./view/no-event.js";
import EventView from "./view/event.js";
import EventEditView from "./view/event-edit.js";
import {generateEvent} from "./mock/event.js";
import {render, RenderPosition} from "./utils.js";

const EVENTS_COUNT = 10;

const events = new Array(EVENTS_COUNT).fill().map(generateEvent);

const renderEvent = (eventListElement, event) => {
  const eventComponent = new EventView(event);
  const eventEditComponent = new EventEditView(events, event);

  const replaceCardToForm = () => {
    eventListElement.replaceChild(eventEditComponent.getElement(), eventComponent.getElement());
    eventEditComponent.getElement().querySelector(`.event__rollup-btn`).classList.toggle(`event__rollup-open`);
  };

  const replaceFormToCard = () => {
    eventListElement.replaceChild(eventComponent.getElement(), eventEditComponent.getElement());
    // eventEditComponent.getElement().querySelector(`.event__rollup-btn`).classList.toggle(`event__rollup-open`);
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      replaceFormToCard();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  eventComponent.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
    replaceCardToForm();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  eventEditComponent.getElement().querySelector(`.event__header .event__rollup-btn`).addEventListener(`click`, () => {
    replaceFormToCard();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });


  eventEditComponent.getElement().querySelector(`form`).addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    replaceFormToCard();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(eventListElement, eventComponent.getElement(), RenderPosition.BEFOREEND);
};

const pageBody = document.querySelector(`.page-body`);

const tripMainElement = document.querySelector(`.trip-main`);
const siteInfoComponent = new SiteInfoView(events);
render(tripMainElement, siteInfoComponent.getElement(), RenderPosition.AFTERBEGIN);

const newEventButtonComponent = new NewEventButtonView();
render(tripMainElement, newEventButtonComponent.getElement(), RenderPosition.BEFOREEND);

const siteMenuElement = tripMainElement.querySelector(`.trip-controls`);
render(siteMenuElement, new SiteMenuView().getElement(), RenderPosition.BEFOREEND);
render(siteMenuElement, new FilterView().getElement(), RenderPosition.BEFOREEND);

const tripElement = pageBody.querySelector(`.page-main > .page-body__container`);

const tripComponent = new TripView();
render(tripElement, tripComponent.getElement(), RenderPosition.BEFOREEND);

if (events.length === 0) {
  render(tripComponent.getElement(), new NoEventView().getElement(), RenderPosition.BEFOREEND);
} else {
  render(tripComponent.getElement(), new SortView().getElement(), RenderPosition.BEFOREEND);


  const eventListComponent = new EventListView();
  render(tripComponent.getElement(), eventListComponent.getElement(), RenderPosition.BEFOREEND);

  events.forEach((event) => renderEvent(eventListComponent.getElement(), event));
}
