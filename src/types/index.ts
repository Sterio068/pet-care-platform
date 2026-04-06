export type PetType = "dog" | "cat";

export type DogSize = "small" | "medium" | "large";

export type LifeStage = "puppy" | "adult" | "senior";

export type ActivityLevel = "low" | "moderate" | "high";

export interface VaccineEntry {
  weekAge: number;
  label: string;
  vaccines: string[];
  required: boolean;
  note?: string;
}

export interface SymptomOption {
  id: string;
  label: string;
  petTypes: PetType[];
}

export interface SymptomCause {
  name: string;
  description: string;
  urgency: "low" | "medium" | "high" | "emergency";
}

export interface SymptomResult {
  urgencyLevel: "低" | "中" | "高" | "緊急";
  urgencyColor: string;
  causes: SymptomCause[];
  advice: string[];
}

export type ArticleCategory = "health" | "food" | "behavior" | "grooming" | "beginner";

export interface BreedProfile {
  slug: string;
  petType: PetType;
  name: string;
  nameEn: string;
  coverUrl?: string;
  origin: string;
  size: "xs" | "s" | "m" | "l" | "xl";
  sizeLabel: string;
  weightRange: string;
  lifeSpan: string;
  coat: "short" | "medium" | "long";
  coatLabel: string;
  energyLevel: 1 | 2 | 3 | 4 | 5;
  friendliness: 1 | 2 | 3 | 4 | 5;
  trainability: 1 | 2 | 3 | 4 | 5;
  shedding: 1 | 2 | 3 | 4 | 5;
  summary: string;
  personality: string[];
  commonDiseases: string[];
  careNotes: string[];
  suitableFor: string[];
}

export interface ArticleMeta {
  slug: string;
  title: string;
  description: string;
  category: ArticleCategory;
  keywords: string[];
  publishedAt: string;
  readingMinutes: number;
  cover?: string;
}
