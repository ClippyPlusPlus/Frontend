export function playSound(payload) {
  if (payload.source === 'local') {
    return playLocalSound(payload.sound);
  }

  if (payload.source === 'text') {
    return playTextToSpeech(payload.sound);
  }
}

function playLocalSound(soundName) {
  let audio = new Audio("/Sounds/" + soundName);
  audio.play();
}

function playTextToSpeech(text) {
  let speechToText = new SpeechSynthesisUtterance();
  speechToText.text = text;
  speechToText.lang = 'nl';
  window.speechSynthesis.speak(speechToText);
}
