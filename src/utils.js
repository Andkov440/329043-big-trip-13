export const eventTypes = [
  `Taxi`,
  `Bus`,
  `Train`,
  `Ship`,
  `Transport`,
  `Drive`,
  `Flight`,
  `Check-in`,
  `Sightseeing`,
  `Restaurant`,
];

export const destination = [
  `Amsterdam`,
  `Chamonix`,
  `Geneva`,
  `Paris`,
  `Praga`,
];

export const text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Cras aliquet varius magna, non porta ligula feugiat eget.
                  Fusce tristique felis at fermentum pharetra.
                  Aliquam id orci ut lectus varius viverra.
                  Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.
                  Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.
                  Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.
                  Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat.
                  Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;

export const offers = [
  {
    name: `Order Uber`,
    type: `taxi`,
    price: 20,
    checked: true,
  },
  {
    name: `Add luggage`,
    type: `luggage`,
    price: 50,
    checked: false,
  },
  {
    name: `Switch to comfort`,
    type: `comfort`,
    price: 80,
    checked: false,
  },
  {
    name: `Rent a car`,
    type: `rent`,
    price: 200,
    checked: true,
  },
  {
    name: `Add breakfast`,
    type: `meal`,
    price: 50,
    checked: true,
  },
];

export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

export const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

export const renderTemplate = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRandomArray = (arr, min = 0, max = 1) => {
  const result = [];
  for (let i = 0; i < getRandomInteger(min, max); i++) {
    result.push(arr[getRandomInteger(0, arr.length - 1)]);
  }
  return result;
};

export const getDuration = (start, end) => {
  const secondsInHour = 3600;
  const secondsInDay = 86400;
  let result = 0;
  let timestamp = end - start;
  let days = 0;
  let hrs = 0;
  let mnts = 0;

  switch (true) {
    case (timestamp < secondsInHour):
      result = Math.floor(timestamp / 60).toString().padStart(2, `0`) + `M`;
      break;
    case (timestamp > secondsInHour && timestamp < secondsInDay):
      hrs = Math.floor(timestamp / 3600);
      timestamp -= hrs * 3600;
      mnts = Math.floor(timestamp / 60);
      result = hrs.toString().padStart(2, `0`) + `H ` + mnts.toString().padStart(2, `0`) + `M`;
      break;
    default:
      days = Math.floor(timestamp / (3600 * 24));
      timestamp -= days * 3600 * 24;
      hrs = Math.floor(timestamp / 3600);
      timestamp -= hrs * 3600;
      mnts = Math.floor(timestamp / 60);
      result = days.toString().padStart(2, `0`) + `D ` + hrs.toString().padStart(2, `0`) + `H ` + mnts.toString().padStart(2, `0`) + `M`;
  }

  return result;
};