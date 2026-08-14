/**
 * TEMP_OPTIONS —
 * Each option can be time-limited (auto-enables/disables based on today's date)
 * and/or manually force-disabled (e.g. Summer Camp is currently closed).
 * A disabled option still shows in the list (greyed out, unselectable) rather
 * than disappearing, so parents can see it exists and know it's not open yet.
 */

export interface TempCourseOption {
  id: string;
  title: string;
  /** ISO date string. Option becomes selectable starting this date. Omit for "always available from now". */
  availableFrom?: string;
  /** ISO date string. Option becomes disabled after this date. Omit for "no end date". */
  availableUntil?: string;
  /** Manual override — true always disables it, regardless of the date window. */
  forceDisabled?: boolean;
}

export const TEMP_OPTIONS: TempCourseOption[] = [
  {
    id: 'summer-camp-2026',
    title: 'Summer Camp 2026',
    forceDisabled: true, // registrations closed
  },
  {
    id: 'ai-workshop',
    title: 'AI Workshop',
    availableFrom: '2026-08-14T00:00:00',
    availableUntil: '2026-08-25T23:59:59',
  },
  {
    id: 'canva-workshop',
    title: 'Canva MAGIC Workshop',
    availableFrom: '2026-08-14T00:00:00',
    availableUntil: '2026-08-25T23:59:59',
  },
];

/** Returns true if this option should be disabled right now (date-based or forced). */
export function isTempOptionDisabled(option: TempCourseOption): boolean {
  if (option.forceDisabled) return true;

  const now = new Date();

  if (option.availableFrom && now < new Date(option.availableFrom)) return true;
  if (option.availableUntil && now > new Date(option.availableUntil)) return true;

  return false;
}
