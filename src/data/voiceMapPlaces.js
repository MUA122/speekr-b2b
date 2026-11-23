// Pins use capital-city coordinates, except Jeddah for the Urban Hijazi recording.
// Label slots are offsets within the map's 1200 × 560 canvas, independent of the pins.
const label = (en, ar) => ({ en, ar });

export const voiceMapPlaces = [
  { id: 'gb', tail: 'right', country: label('United Kingdom', 'المملكة المتحدة'), dialect: label('British English', 'الإنجليزية البريطانية'),
    lang: 'en-GB', coords: [-0.1278, 51.5074], slot: [412, 58] },
  { id: 'fr', tail: 'right', country: label('France', 'فرنسا'), dialect: label('French', 'الفرنسية'),
    lang: 'fr-FR', coords: [2.3522, 48.8566], slot: [318, 197] },
  { id: 'ma', tail: 'right', country: label('Morocco', 'المغرب'), dialect: label('Moroccan Darija', 'الدارجة المغربية'),
    lang: 'ar-MA', coords: [-6.8498, 34.0209], slot: [354, 342] },
  { id: 'eg', tail: 'top', country: label('Egypt', 'مصر'), dialect: label('Egyptian Arabic', 'اللهجة المصرية'),
    lang: 'ar-EG', coords: [31.2357, 30.0444], slot: [582, 463] },
  { id: 'lb', tail: 'left', country: label('Lebanon', 'لبنان'), dialect: label('Lebanese Arabic', 'اللهجة اللبنانية'),
    lang: 'ar-LB', coords: [35.5018, 33.8938], slot: [846, 90] },
  { id: 'sa', tail: 'top', country: label('Saudi Arabia', 'السعودية'), dialect: label('Saudi Arabic (Hijazi)', 'اللهجة الحجازية السعودية'),
    lang: 'ar-SA', coords: [39.1925, 21.4858], slot: [828, 420] },
  { id: 'ae', tail: 'left', country: label('United Arab Emirates', 'الإمارات'), dialect: label('Emirati Arabic', 'اللهجة الإماراتية'),
    lang: 'ar-AE', coords: [54.3773, 24.4539], slot: [1010, 268] },
];
