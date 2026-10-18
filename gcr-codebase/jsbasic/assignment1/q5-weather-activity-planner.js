const temperature = 12;
const isRaining = false;
const windSpeed = 24;
const isColdAndWindy = temperature < 15 && windSpeed > 20;
const shouldStayIndoors = isRaining || isColdAndWindy;

let activity;

if (shouldStayIndoors) {
  if (isRaining) {
    activity = "Stay indoors with hot coffee.";
  } else {
    activity = "Too cold and windy — stay home.";
  }
} else if (temperature > 35) {
  activity = "Go swimming.";
} else {
  activity = "Perfect day for a walk.";
}

console.log(activity);
