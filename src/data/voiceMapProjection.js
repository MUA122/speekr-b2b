// The country pins and /images/voice-atlas/world.svg share this plate carrée viewport.
const west = -180;
const east = 180;
const north = 84;
const south = -58;

export const voiceMapSize = { width: 1200, height: 560 };

export function projectVoiceLocation(longitude, latitude) {
  return {
    x: (longitude - west) / (east - west) * voiceMapSize.width,
    y: (north - latitude) / (north - south) * voiceMapSize.height,
  };
}
