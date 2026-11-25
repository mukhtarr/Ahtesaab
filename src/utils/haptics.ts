export function vibrateAndroid(durationMs = 15): void {
  if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
    try {
      navigator.vibrate(durationMs);
    } catch {
      // ignore if blocked by browser policy
    }
  }
}
