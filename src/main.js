import SiteInfoView from "./view/info.js";
import NewEventButtonView from "./view/new-event-button.js";
import SiteMenuView from "./view/menu.js";
import FilterView from "./view/filter.js";
import {generateEvent} from "./mock/event.js";
import TripPresenter from "./presenter/trip.js";
import {render, RenderPosition} from "./utils/render.js";

const EVENTS_COUNT = 10;

const events = new Array(EVENTS_COUNT).fill().map(generateEvent);

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

const tripPresenter = new TripPresenter(tripElement);
tripPresenter.init(events);
