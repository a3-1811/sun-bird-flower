export function getInitialDatetime(): Date {
  const current = new Date();
  current.setHours(0, 0, 0);
  return current;
}

export function modifyDatetime(date: Date, hours = 0, minutes = 0, seconds = 0): Date {
  const newDate = new Date(date);
  newDate.setHours(hours);
  newDate.setMinutes(minutes);
  newDate.setSeconds(seconds);
  return newDate;
}

export function getRandomIntInclusive(min:number, max:number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //Both maximum and minimum are inclusive
}

export function getRandomEnumValue<T>(anEnum: T): T[keyof T] {
  const enumValues = Object.values(anEnum);
  const randomIndex = Math.floor(Math.random() * enumValues.length);
  return enumValues[randomIndex] as T[keyof T];
}