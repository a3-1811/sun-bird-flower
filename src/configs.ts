export const SUNRISE_HOUR: number = 6;

export const SUNDOWN_HOUR: number = 18;

export const FLOWER_HOURS = {
  BLOOMING_HOUR: { from: SUNRISE_HOUR, to: SUNRISE_HOUR + 2 },
  WILT_HOUR: { from: SUNDOWN_HOUR, to: SUNDOWN_HOUR + 2 },
};

export const BIRD_HOURS = {
  WAKE_HOUR: SUNRISE_HOUR - 1 ,
  SLEEP_HOUR: SUNDOWN_HOUR + 1,
};

export const GARDEN_SETTING = {
  birds: 5,
  flowers: 10
}