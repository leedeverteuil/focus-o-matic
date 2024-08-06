import { truncateListText } from "./text";

// types
export type Sound = {
  id: string;
  name: string;
};

export type SoundCategory = {
  id: string;
  name: string;
  sounds: Sound[];
};

export type Mix = {
  id: string;
  name: string;
  soundsWithVolumes: { soundId: string, volume: number }[];
};

// configuration
export const categories: SoundCategory[] = [
  {
    id: "nature",
    name: "Nature",
    sounds: [
      { id: "rainfall", name: "Rainfall" },
      { id: "ocean-waves", name: "Ocean Waves" },
      { id: "birds", name: "Birds" },
      { id: "waterfall", name: "Waterfall" },
      { id: "wind-in-trees", name: "Wind-in-trees" },
      { id: "mountain-breeze", name: "Mountain Breeze" },
      { id: "river", name: "River" },
      { id: "thunderstorm", name: "Thunderstorm" },
    ],
  },
  {
    id: "urban",
    name: "Urban",
    sounds: [
      { id: "city-traffic", name: "City Traffic" },
      { id: "cafe-chatter", name: "Cafe Chatter" },
      { id: "train", name: "Train" },
      { id: "distant-sirens", name: "Distant Sirens" },
    ],
  },
  {
    id: "white-noise",
    name: "White Noise",
    sounds: [
      { id: "white-noise", name: "White Noise" },
      { id: "brown-noise", name: "Brown Noise" },
      { id: "fan", name: "Fan" },
    ],
  },
  {
    id: "office",
    name: "Office",
    sounds: [
      { id: "keyboard", name: "Keyboard" },
      { id: "office-ambiance", name: "Office Ambiance" },
    ],
  },
  {
    id: "household",
    name: "Household",
    sounds: [
      { id: "washing-machine", name: "Washing Machine" },
      { id: "clock-ticking", name: "Clock Ticking" },
      { id: "kettle", name: "Kettle" },
      { id: "fireplace", name: "Fireplace" },
      { id: "wind-chimes", name: "Wind Chimes" },
    ],
  },
];

const defaultMixes: Mix[] = [{ "id": "rainy-day-retreat", "name": "Rainy River Day", "soundsWithVolumes": [{ "soundId": "fireplace", "volume": 0.17 }, { "soundId": "mountain-breeze", "volume": 0.16 }, { "soundId": "river", "volume": 0.07 }, { "soundId": "thunderstorm", "volume": 0.08 }, { "soundId": "rainfall", "volume": 0.1 }, { "soundId": "birds", "volume": 0.1 }] }, { "id": "1722972566316", "name": "Urban Cafe", "soundsWithVolumes": [{ "soundId": "city-traffic", "volume": 0.08 }, { "soundId": "cafe-chatter", "volume": 0.08 }, { "soundId": "distant-sirens", "volume": 0.03 }, { "soundId": "fan", "volume": 0.08 }] }, { "id": "1722972723234", "name": "Beach House", "soundsWithVolumes": [{ "soundId": "ocean-waves", "volume": 0.08 }, { "soundId": "mountain-breeze", "volume": 0.25 }, { "soundId": "wind-chimes", "volume": 0.03 }, { "soundId": "birds", "volume": 0.07 }] }]

// cache mixes if already pulled
let mixes: Mix[] | null = null;
let playingAudios: HTMLAudioElement[] = [];
let lastAudioPositions: { [key: string]: number } = {};

// retrieval from storage
export function getMixes(): Mix[] {
  if (mixes !== null) {
    return mixes;
  }

  // try to get from storage
  const storedMixesStr = window.localStorage.getItem("mixes");

  // found mixes
  if (storedMixesStr) {
    mixes = JSON.parse(storedMixesStr) as Mix[];
  }
  // did not find, use default and save
  else {
    window.localStorage.setItem("mixes", JSON.stringify(defaultMixes));
    mixes = defaultMixes;
  }

  return mixes;
}

// saving to storage
export function saveMixes(mixes: Mix[]) {
  window.localStorage.setItem("mixes", JSON.stringify(mixes));
}

export function deleteMix(mixes: Mix[], mix: Mix) {
  const newMixes = mixes.filter((m) => m.id !== mix.id);
  saveMixes(newMixes);
}

// utilities
export function getSound(soundId: string): (Sound | null) {
  for (const category of categories) {
    for (const sound of category.sounds) {
      if (sound.id === soundId) {
        return sound;
      }
    }
  }

  return null;
}

export function getMixDescription(mix: Mix) {
  let soundNames: string[] = [];

  mix.soundsWithVolumes.forEach((soundWithVolume, i) => {
    const sound = getSound(soundWithVolume.soundId);
    if (sound) {
      soundNames.push(sound.name);
    }
  });

  return truncateListText(soundNames, 40);
}

export function stopSounds() {
  playingAudios.forEach((audio) => {
    // save so can resume later on
    lastAudioPositions[audio.src] = audio.currentTime;

    audio.pause();
    audio.remove();
  });

  playingAudios = [];
}

export function playButtonClick() {
  try {
    const audio = new Audio("/sounds/button.mp3");
    audio.volume = 1;
    audio.play();
  }
  catch (err) {
    console.warn(err);
  }
}

export function playMixSounds(mix: Mix) {
  try {
    // stop old sounds
    stopSounds();

    // get sounds for mix
    const { soundsWithVolumes } = mix;

    const audios: HTMLAudioElement[] = [];
    soundsWithVolumes.forEach((soundWithVolume) => {
      const audio = new Audio(`/sounds/${soundWithVolume.soundId}.mp3`);
      audio.loop = true;
      audio.volume = soundWithVolume.volume;
      audio.id = soundWithVolume.soundId;

      // resume from last position if available
      const lastPosition = lastAudioPositions[audio.src];
      if (lastPosition) {
        audio.currentTime = lastPosition;
      }

      audio.play();
      audios.push(audio);
    });

    playingAudios = audios;
  }
  catch (err) {
    console.warn(err);
  }
}

export function updateMixVolumes(mix: Mix) {
  mix.soundsWithVolumes.forEach((soundWithVolume) => {
    const playingAudio = playingAudios.find(audio => audio.id === soundWithVolume.soundId);
    if (playingAudio) {
      playingAudio.volume = soundWithVolume.volume;
    }
  });
}