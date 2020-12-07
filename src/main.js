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
import {render, RenderPosition, replace} from "./utils/render.js";

const EVENTS_COUNT = 10;

const events = new Array(EVENTS_COUNT).fill().map(generateEvent);

const renderEvent = (eventListElement, event) => {
  const eventComponent = new EventView(event);
  const eventEditComponent = new EventEditView(events, event);

  const replaceCardToForm = () => {
    replace(eventEditComponent, eventComponent);
  };

  const replaceFormToCard = () => {
    replace(eventComponent, eventEditComponent);
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      replaceFormToCard();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  eventComponent.setFormEditHandler(() => {
    replaceCardToForm();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  eventEditComponent.setFormCloseHandler(() => {
    replaceFormToCard();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  eventEditComponent.setFormSubmitHandler(() => {
    replaceFormToCard();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(eventListElement, eventComponent, RenderPosition.BEFOREEND);
};

const pageBody = document.querySelector(`.page-body`);

const tripMainElement = document.querySelector(`.trip-main`);
const siteInfoComponent = new SiteInfoView(events);
render(tripMainElement, siteInfoComponent, RenderPosition.AFTERBEGIN);

const newEventButtonComponent = new NewEventButtonView();
render(tripMainElement, newEventButtonComponent, RenderPosition.BEFOREEND);

const siteMenuElement = tripMainElement.querySelector(`.trip-controls`);
render(siteMenuElement, new SiteMenuView(), RenderPosition.BEFOREEND);
render(siteMenuElement, new FilterView(), RenderPosition.BEFOREEND);

const tripElement = pageBody.querySelector(`.page-main > .page-body__container`);

const tripComponent = new TripView();
render(tripElement, tripComponent, RenderPosition.BEFOREEND);

if (events.length === 0) {
  render(tripComponent, new NoEventView(), RenderPosition.BEFOREEND);
} else {
  render(tripComponent, new SortView(), RenderPosition.BEFOREEND);


  const eventListComponent = new EventListView();
  render(tripComponent, eventListComponent, RenderPosition.BEFOREEND);

  events.forEach((event) => renderEvent(eventListComponent, event));
}
