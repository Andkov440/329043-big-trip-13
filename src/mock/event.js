import * as dayjs from 'dayjs';
import {eventTypes, destination, offers, text} from "../utils.js";
import {getRandomInteger, getRandomArray} from "../utils/common.js";

const generateId = () => Date.now() + parseInt(Math.random() * 10000, 10);

const generateEventType = () => {
  const randomIndex = getRandomInteger(0, eventTypes.length - 1);

  return eventTypes[randomIndex];
};

const generateDestination = () => {
  const randomIndex = getRandomInteger(0, destination.length - 1);

  return destination[randomIndex];
};

const generateDescription = () => {
  const textArray = text.split(`.`);

  return getRandomArray(textArray, 1, 5);
};

const generatePhoto = () => {
  const result = [];
  for (let i = 0; i < 6; i++) {
    result.push(`http://picsum.photos/248/152?r=${Math.random()}`);
  }
  return getRandomArray(result, 1, 5);
};

const generateDate = () => dayjs().unix() + getRandomInteger(-186400, 186400);


export const generateEvent = () => {
  const starttime = generateDate();
  const endtime = generateDate();
  return {
    id: generateId(),
    eventType: generateEventType(),
    destinationPoint: generateDestination(),
    eventOffers: getRandomArray(offers, 0, 5),
    description: generateDescription(),
    photo: generatePhoto(),
    starttime: Math.min(starttime, endtime),
    endtime: Math.max(starttime, endtime),
    eventPrice: Math.round(getRandomInteger(10, 200) / 10) * 10,
    isFavorite: Boolean(getRandomInteger(0, 1)),
  };
};
