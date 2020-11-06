export function playLocalSound(soundName) {
  let audio = new Audio("local-audio/" + soundName);
  audio.play();
}