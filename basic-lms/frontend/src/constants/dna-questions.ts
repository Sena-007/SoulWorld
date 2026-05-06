export interface DnaQuestionOption {
  readonly label: string;
  readonly tag: string;
}
export interface DnaQuestion {
  readonly question: string;
  readonly options: readonly DnaQuestionOption[];
}
export const dnaQuestions: readonly DnaQuestion[] = [
  {
    question: "Hangi sabah seni yansitir?",
    options: [{ label: "Sessiz kutuphane", tag: "#minimalist" }, { label: "Sahil yuruyusu", tag: "#cozy" }]
  },
  {
    question: "Hangi muzik tonu daha yakin?",
    options: [{ label: "Akustik", tag: "#calm" }, { label: "Indie", tag: "#vibrant" }]
  },
  {
    question: "Hangi mekan hissi?",
    options: [{ label: "Kucuk kafe", tag: "#cozy" }, { label: "Modern galeri", tag: "#minimalist" }]
  },
  {
    question: "Hafta sonu tercihi?",
    options: [{ label: "Kitapla evde", tag: "#calm" }, { label: "Yeni yerler", tag: "#explorer" }]
  },
  {
    question: "Hangi renk paleti?",
    options: [{ label: "Pastel", tag: "#soft" }, { label: "Kontrast", tag: "#vibrant" }]
  }
];

