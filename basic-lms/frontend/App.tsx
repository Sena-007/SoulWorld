import React, { useMemo, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { dnaQuestions } from "./src/constants/dna-questions";
import { analyticsClient } from "./src/services/analytics-service";
import { buildCompatibilityScore, buildWeeklyRecap } from "./src/services/recommendation-service";
import { AppEntry, EntryType, PlannedItem, UserProfile } from "./src/types/domain";

const defaultProfile: UserProfile = { uid: "demo-user", dnaProfile: [], createdAt: Date.now() };

const entryTypes: EntryType[] = ["book", "music", "place"];

export default function App(): React.JSX.Element {
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);
  const [entries, setEntries] = useState<AppEntry[]>([]);
  const [plannedItems, setPlannedItems] = useState<PlannedItem[]>([]);
  const [titleInput, setTitleInput] = useState<string>("");
  const [noteInput, setNoteInput] = useState<string>("");
  const [selectedType, setSelectedType] = useState<EntryType>("book");
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [view, setView] = useState<"grid" | "discovery" | "recap">("grid");

  const onboardingCompleted = profile.dnaProfile.length > 0;
  const recap = useMemo(() => buildWeeklyRecap(entries), [entries]);
  const discoverySeed: AppEntry[] = [
    { id: "d1", userId: "anon", type: "book", title: "The Midnight Library", subInfo: "Matt Haig", imageUrl: "", userNote: "", tags: ["#cozy"], isPrivate: false, createdAt: Date.now() },
    { id: "d2", userId: "anon", type: "music", title: "Holocene", subInfo: "Bon Iver", imageUrl: "", userNote: "", tags: ["#melankolik"], isPrivate: false, createdAt: Date.now() }
  ];

  const handleLogin = (): void => {
    setIsAuthenticated(true);
  };

  const handleAnswer = (tag: string): void => {
    const nextTags = [...profile.dnaProfile, tag];
    if (currentQuestion === dnaQuestions.length - 1) {
      setProfile({ ...profile, dnaProfile: nextTags });
      analyticsClient.track("onboarding_completed", { dnaTagCount: nextTags.length, durationSeconds: 12 });
      return;
    }
    setProfile({ ...profile, dnaProfile: nextTags });
    setCurrentQuestion((value) => value + 1);
  };

  const handleCreateEntry = (): void => {
    if (titleInput.trim().length < 3) {
      return;
    }
    const nextEntry: AppEntry = {
      id: `${Date.now()}`,
      userId: profile.uid,
      type: selectedType,
      title: titleInput.trim(),
      subInfo: "Auto-filled metadata",
      imageUrl: "",
      userNote: noteInput.slice(0, 280),
      tags: profile.dnaProfile.slice(0, 2),
      isPrivate: true,
      createdAt: Date.now()
    };
    setEntries((value) => [nextEntry, ...value]);
    analyticsClient.track("entry_saved", { entryType: selectedType, hasUserNote: noteInput.length > 0, tagCount: nextEntry.tags.length });
    if (entries.length === 0) {
      analyticsClient.track("first_entry_saved", { entryType: selectedType, timeToActionSeconds: 14 });
    }
    setTitleInput("");
    setNoteInput("");
  };

  const handleSavePlannedItem = (entry: AppEntry): void => {
    const score = buildCompatibilityScore(profile.dnaProfile, entry.tags);
    if (score < 70) {
      return;
    }
    const nextItem: PlannedItem = { id: `${entry.id}-planned`, sourceEntryId: entry.id, type: entry.type, title: entry.title, createdAt: Date.now() };
    setPlannedItems((value) => [nextItem, ...value]);
    analyticsClient.track("discovery_item_saved", { entryType: entry.type, compatibilityScore: score });
  };

  if (!isAuthenticated) {
    return (
      <SafeAreaView style={styles.screen}>
        <View style={styles.centeredCard}>
          <Text style={styles.title}>SoulWorld</Text>
          <Text style={styles.subtitle}>Dijital gurultuden uzak, kendi hikayenle tanis.</Text>
          <TouchableOpacity style={styles.primaryButton} onPress={handleLogin}>
            <Text style={styles.primaryButtonText}>Email ile Giris (Demo)</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (!onboardingCompleted) {
    const question = dnaQuestions[currentQuestion];
    return (
      <SafeAreaView style={styles.screen}>
        <View style={styles.centeredCard}>
          <Text style={styles.title}>Zevk DNA Testi</Text>
          <Text style={styles.subtitle}>{question.question}</Text>
          {question.options.map((option) => (
            <TouchableOpacity key={option.label} style={styles.secondaryButton} onPress={() => handleAnswer(option.tag)}>
              <Text style={styles.secondaryButtonText}>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.navRow}>
        <TouchableOpacity onPress={() => setView("grid")}><Text style={styles.navItem}>Muze</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => setView("discovery")}><Text style={styles.navItem}>Kesfet</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => setView("recap")}><Text style={styles.navItem}>Recap</Text></TouchableOpacity>
      </View>
      {view === "grid" ? (
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.sectionTitle}>Magic Entry</Text>
          <View style={styles.typeRow}>
            {entryTypes.map((entryType) => (
              <TouchableOpacity key={entryType} style={selectedType === entryType ? styles.typeButtonActive : styles.typeButton} onPress={() => setSelectedType(entryType)}>
                <Text>{entryType}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <TextInput style={styles.input} placeholder="Kitap, sarki veya mekan ara..." value={titleInput} onChangeText={setTitleInput} />
          <TextInput style={styles.input} placeholder="Bana ne hissettirdi? (max 280)" value={noteInput} onChangeText={setNoteInput} />
          <TouchableOpacity style={styles.primaryButton} onPress={handleCreateEntry}>
            <Text style={styles.primaryButtonText}>Kaydet</Text>
          </TouchableOpacity>
          <Text style={styles.sectionTitle}>Visual Grid</Text>
          {entries.map((entry) => (
            <View style={styles.card} key={entry.id}>
              <Text style={styles.cardType}>{entry.type.toUpperCase()}</Text>
              <Text style={styles.cardTitle}>{entry.title}</Text>
              <Text>{entry.subInfo}</Text>
              <Text>{entry.userNote}</Text>
            </View>
          ))}
        </ScrollView>
      ) : null}
      {view === "discovery" ? (
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.sectionTitle}>Anonim Ilham</Text>
          {discoverySeed.map((entry) => {
            const score = buildCompatibilityScore(profile.dnaProfile, entry.tags);
            return (
              <View style={styles.card} key={entry.id}>
                <Text style={styles.cardTitle}>{entry.title}</Text>
                <Text>Uyum Skoru: {score}%</Text>
                <TouchableOpacity style={styles.secondaryButton} onPress={() => handleSavePlannedItem(entry)}>
                  <Text style={styles.secondaryButtonText}>Koleksiyonuma Ekle</Text>
                </TouchableOpacity>
              </View>
            );
          })}
          <Text style={styles.sectionTitle}>Gelecek Planlari</Text>
          {plannedItems.map((item) => <Text key={item.id}>- {item.title}</Text>)}
        </ScrollView>
      ) : null}
      {view === "recap" ? (
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.sectionTitle}>Haftalik Pano</Text>
          <Text>Toplam Kayit: {recap.entryCount}</Text>
          <Text>Baskin Tur: {recap.dominantType ?? "Yok"}</Text>
        </ScrollView>
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#f5efe6" },
  centeredCard: { margin: 16, padding: 20, borderRadius: 12, backgroundColor: "#ffffff" },
  title: { fontSize: 28, fontWeight: "700", marginBottom: 12 },
  subtitle: { fontSize: 16, color: "#495057", marginBottom: 12 },
  primaryButton: { backgroundColor: "#7da37d", padding: 12, borderRadius: 10, marginTop: 8 },
  primaryButtonText: { color: "#ffffff", fontWeight: "600", textAlign: "center" },
  secondaryButton: { backgroundColor: "#e8ecef", padding: 10, borderRadius: 8, marginTop: 8 },
  secondaryButtonText: { textAlign: "center" },
  navRow: { flexDirection: "row", justifyContent: "space-around", paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: "#dee2e6" },
  navItem: { fontWeight: "600" },
  content: { padding: 16, gap: 8 },
  sectionTitle: { fontSize: 18, fontWeight: "700", marginTop: 8 },
  typeRow: { flexDirection: "row", gap: 8, marginBottom: 8 },
  typeButton: { paddingHorizontal: 10, paddingVertical: 6, borderWidth: 1, borderColor: "#ced4da", borderRadius: 8 },
  typeButtonActive: { paddingHorizontal: 10, paddingVertical: 6, borderWidth: 1, borderColor: "#7da37d", borderRadius: 8, backgroundColor: "#d8e8d8" },
  input: { borderWidth: 1, borderColor: "#ced4da", borderRadius: 8, padding: 10, backgroundColor: "#ffffff" },
  card: { padding: 12, borderRadius: 10, backgroundColor: "#ffffff", marginTop: 8 },
  cardType: { fontSize: 12, color: "#6c757d" },
  cardTitle: { fontSize: 16, fontWeight: "600" }
});

