import * as dayjs from 'dayjs';
import {getRandomInteger, getRandomArray, eventTypes, destination, offers} from "../view/utils.js";


const generateEventType = () => {
  const randomIndex = getRandomInteger(0, eventTypes.length - 1);

  return eventTypes[randomIndex];
};

const generateDestination = () => {
  const randomIndex = getRandomInteger(0, destination.length - 1);

  return destination[randomIndex];
};

const generateDescription = () => {
  const text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Cras aliquet varius magna, non porta ligula feugiat eget.
                  Fusce tristique felis at fermentum pharetra.
                  Aliquam id orci ut lectus varius viverra.
                  Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.
                  Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.
                  Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.
                  Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat.
                  Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;
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
