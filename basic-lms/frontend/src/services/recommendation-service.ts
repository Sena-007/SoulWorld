import { AppEntry, EntryType, WeeklyRecap } from "../types/domain";

const fullCompatibilityScore = 100;
const partialCompatibilityScore = 70;

export const buildCompatibilityScore = (userDnaTags: readonly string[], entryTags: readonly string[]): number => {
  const hasMatch = userDnaTags.some((tag) => entryTags.includes(tag));
  return hasMatch ? fullCompatibilityScore : partialCompatibilityScore;
};

export const buildWeeklyRecap = (entries: readonly AppEntry[]): WeeklyRecap => {
  const entryTypeCount = entries.reduce<Record<EntryType, number>>(
    (accumulator, currentEntry) => {
      accumulator[currentEntry.type] += 1;
      return accumulator;
    },
    { book: 0, music: 0, place: 0 }
  );
  const sortedByCount = (Object.entries(entryTypeCount) as [EntryType, number][])
    .sort((a, b) => b[1] - a[1]);
  const dominantType = sortedByCount[0][1] > 0 ? sortedByCount[0][0] : null;
  return { entryCount: entries.length, dominantType };
};

