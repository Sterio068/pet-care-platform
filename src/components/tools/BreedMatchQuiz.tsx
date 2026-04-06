"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { PetTypeToggle } from "@/components/ui/PetTypeToggle";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { RatingBar } from "@/components/ui/RatingBar";
import { getBreedsByPetType } from "@/data/breeds";
import type { PetType, BreedProfile } from "@/types";

interface Question {
  id: string;
  text: string;
  options: { label: string; value: number }[];
}

const QUESTIONS: Question[] = [
  {
    id: "space",
    text: "你的居住空間？",
    options: [
      { label: "小套房 / 小公寓", value: 1 },
      { label: "一般公寓 / 大樓", value: 3 },
      { label: "透天厝 / 有院子", value: 5 },
    ],
  },
  {
    id: "time",
    text: "每天能陪伴毛孩的時間？",
    options: [
      { label: "少於 2 小時", value: 1 },
      { label: "2-4 小時", value: 3 },
      { label: "大部分時間在家", value: 5 },
    ],
  },
  {
    id: "exercise",
    text: "你喜歡的運動量？",
    options: [
      { label: "宅在家、散步就好", value: 1 },
      { label: "每天散步 30-60 分鐘", value: 3 },
      { label: "跑步、登山、大量戶外", value: 5 },
    ],
  },
  {
    id: "grooming",
    text: "願意花在清潔美容的時間？",
    options: [
      { label: "越少越好", value: 1 },
      { label: "每週梳毛洗澡可以", value: 3 },
      { label: "每天梳毛也願意", value: 5 },
    ],
  },
  {
    id: "experience",
    text: "你的養寵經驗？",
    options: [
      { label: "完全新手", value: 1 },
      { label: "有養過但不久", value: 3 },
      { label: "有多年經驗", value: 5 },
    ],
  },
];

function scoreBreed(
  breed: BreedProfile,
  answers: Record<string, number>,
): number {
  let score = 0;
  const space = answers.space ?? 3;
  const time = answers.time ?? 3;
  const exercise = answers.exercise ?? 3;
  const grooming = answers.grooming ?? 3;
  const experience = answers.experience ?? 3;

  // Space vs size
  const sizeNeed: Record<string, number> = { xs: 1, s: 2, m: 3, l: 4, xl: 5 };
  score += 5 - Math.abs(space - (sizeNeed[breed.size] ?? 3));

  // Time vs friendliness
  score += 5 - Math.abs(time - breed.friendliness);

  // Exercise vs energy
  score += 5 - Math.abs(exercise - breed.energyLevel);

  // Grooming tolerance vs shedding
  score += 5 - Math.abs(grooming - breed.shedding);

  // Experience vs trainability (inverse)
  const difficulty = 6 - breed.trainability; // high trainability = easier
  score += 5 - Math.abs(experience - difficulty);

  return score;
}

export function BreedMatchQuiz() {
  const [petType, setPetType] = useState<PetType>("dog");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showResult, setShowResult] = useState(false);

  const breeds = useMemo(() => getBreedsByPetType(petType), [petType]);

  const results = useMemo(() => {
    if (!showResult) return [];
    return breeds
      .map((b) => ({ breed: b, score: scoreBreed(b, answers) }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);
  }, [showResult, breeds, answers]);

  const currentQ = QUESTIONS[step];
  const totalSteps = QUESTIONS.length;

  const handleAnswer = (value: number) => {
    const updated = { ...answers, [currentQ.id]: value };
    setAnswers(updated);
    if (step < totalSteps - 1) {
      setStep(step + 1);
    } else {
      setShowResult(true);
    }
  };

  const reset = () => {
    setStep(0);
    setAnswers({});
    setShowResult(false);
  };

  if (showResult && results.length > 0) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-ink-900 mb-2">
            最適合你的 3 個品種
          </h3>
          <p className="text-ink-500 text-sm">依據你的生活方式與偏好推薦</p>
        </div>

        {results.map((r, i) => (
          <Card key={r.breed.slug} padding="lg" className={i === 0 ? "border-2 border-brand-300" : ""}>
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  {i === 0 && (
                    <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-brand-500 text-white">
                      最佳推薦
                    </span>
                  )}
                  <span className="text-sm text-ink-500">#{i + 1}</span>
                </div>
                <h4 className="text-xl font-bold text-ink-900">{r.breed.name}</h4>
                <p className="text-sm text-ink-500">{r.breed.nameEn} · {r.breed.sizeLabel}</p>
              </div>
              <div className="text-3xl" aria-hidden="true">
                {r.breed.petType === "dog" ? "🐶" : "🐱"}
              </div>
            </div>
            <p className="text-sm text-ink-700 mb-4 leading-relaxed">
              {r.breed.summary}
            </p>
            <div className="space-y-2 mb-4">
              <RatingBar label="活動量" value={r.breed.energyLevel} />
              <RatingBar label="親人度" value={r.breed.friendliness} />
              <RatingBar label="訓練易" value={r.breed.trainability} />
              <RatingBar label="掉毛量" value={r.breed.shedding} />
            </div>
            <Link
              href={`/breeds/${r.breed.slug}`}
              className="text-brand-600 font-semibold text-sm hover:underline inline-flex items-center gap-1"
            >
              查看完整品種介紹 <span aria-hidden="true">→</span>
            </Link>
          </Card>
        ))}

        <div className="text-center">
          <Button variant="ghost" onClick={reset}>
            重新測驗
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <PetTypeToggle
          value={petType}
          onChange={(t) => {
            setPetType(t);
            reset();
          }}
        />
      </div>

      {/* Progress */}
      <div className="flex gap-1.5">
        {QUESTIONS.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full ${i <= step ? "bg-brand-500" : "bg-cream-300"}`}
          />
        ))}
      </div>

      <div className="text-center">
        <p className="text-xs text-ink-500 mb-2">
          問題 {step + 1} / {totalSteps}
        </p>
        <h3 className="text-xl md:text-2xl font-bold text-ink-900">
          {currentQ.text}
        </h3>
      </div>

      <div className="space-y-3">
        {currentQ.options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => handleAnswer(opt.value)}
            className="w-full text-left px-5 py-4 rounded-[14px] border border-cream-300 bg-white hover:border-brand-400 hover:bg-brand-50 transition-colors font-medium text-ink-900"
          >
            {opt.label}
          </button>
        ))}
      </div>

      {step > 0 && (
        <div className="text-center">
          <button
            type="button"
            onClick={() => setStep(step - 1)}
            className="text-sm text-ink-500 hover:text-brand-600"
          >
            ← 上一題
          </button>
        </div>
      )}
    </div>
  );
}
