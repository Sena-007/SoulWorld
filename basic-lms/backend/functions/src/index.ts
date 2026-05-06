import * as admin from "firebase-admin";
import { onCall } from "firebase-functions/https";
import { onSchedule } from "firebase-functions/scheduler";

admin.initializeApp();
const database = admin.firestore();

interface SaveDiscoveryRequest {
  readonly sourceEntryId: string;
  readonly title: string;
  readonly type: "book" | "music" | "place";
}

export const saveDiscoveryItem = onCall<SaveDiscoveryRequest>(async (request) => {
  if (!request.auth) {
    throw new Error("Unauthenticated request.");
  }
  const { sourceEntryId, title, type } = request.data;
  if (!sourceEntryId || !title || !type) {
    throw new Error("Missing required fields.");
  }
  const itemReference = database.collection("plannedItems").doc();
  await itemReference.set({
    id: itemReference.id,
    userId: request.auth.uid,
    sourceEntryId,
    title,
    type,
    createdAt: Date.now()
  });
  return { success: true, id: itemReference.id };
});

export const generateWeeklyRecap = onSchedule("every sunday 20:00", async () => {
  const usersSnapshot = await database.collection("users").get();
  const recapWrites = usersSnapshot.docs.map(async (userDoc) => {
    const userId = userDoc.id;
    const entrySnapshot = await database.collection("entries").where("userId", "==", userId).limit(100).get();
    const recapReference = database.collection("weeklyRecaps").doc();
    await recapReference.set({
      id: recapReference.id,
      userId,
      entryCount: entrySnapshot.size,
      generatedAt: Date.now()
    });
  });
  await Promise.all(recapWrites);
});

