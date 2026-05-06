export type EntryType = "book" | "music" | "place";
export interface UserProfile {
  readonly uid: string;
  readonly dnaProfile: string[];
  readonly createdAt: number;
}
export interface AppEntry {
  readonly id: string;
  readonly userId: string;
  readonly type: EntryType;
  readonly title: string;
  readonly subInfo: string;
  readonly imageUrl: string;
  readonly userNote: string;
  readonly tags: string[];
  readonly isPrivate: boolean;
  readonly createdAt: number;
}
export interface PlannedItem {
  readonly id: string;
  readonly sourceEntryId: string;
  readonly type: EntryType;
  readonly title: string;
  readonly createdAt: number;
}
export interface WeeklyRecap {
  readonly entryCount: number;
  readonly dominantType: EntryType | null;
}

