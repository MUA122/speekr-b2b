/**
 * @typedef {{patterns: string[], replies: string[], followup?: string}} LocalIntent
 * @typedef {{id: string, en: LocalIntent, ar: LocalIntent}} Intent
 * Prefix a pattern with "=" to match only a complete utterance.
 */
export function lines(patterns, first, second, followup) {
  return { patterns: patterns.split('|'), replies: [first, second], followup };
}
export function intent(id, en, ar) { return { id, en, ar }; }
