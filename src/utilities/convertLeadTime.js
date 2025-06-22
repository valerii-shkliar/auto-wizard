const QUANT_MIN_IN_ONE_HOUR = 60;

export function convertLeadTime(leadTime) {
  const time = Number(leadTime);
  const hours = Math.trunc(time);

  if (time < 1) {
    return `${time * QUANT_MIN_IN_ONE_HOUR} min`;
  }
  if (time % time === 0) {
    return `${hours} h`;
  }
  if (time > 1) {
    const minutes = time - hours;

    return `${hours} h ${minutes * QUANT_MIN_IN_ONE_HOUR} min`;
  }
}
