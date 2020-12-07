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
