export function isMobile(): boolean {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 640;
}

export function isTouch(): boolean {
  if (typeof window === 'undefined') return false;
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}
