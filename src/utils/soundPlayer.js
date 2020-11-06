export function playLocalSound(soundName) {
  let audio = new Audio("/Sounds/" + soundName);
  audio.play();
}