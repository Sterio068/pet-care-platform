/**
 * Maps each tool slug to the article keywords used to find related articles.
 * Articles are scored by matching title/description/keywords against these terms.
 */
const TOOL_ARTICLE_MATCH: Record<string, string[]> = {
  "pet-age": ["老狗", "老犬", "高齡", "老貓", "幼犬", "幼貓", "年齡", "壽命"],
  "vaccine-schedule": ["疫苗", "幼犬", "幼貓", "接種", "驅蟲"],
  "symptom-checker": ["嘔吐", "腹瀉", "打噴嚏", "掉毛", "症狀", "疾病", "就醫"],
  "food-calculator": ["飼料", "飲食", "熱量", "餵食", "鮮食", "喝水"],
  "weight-tracker": ["過胖", "減重", "體重", "BCS", "飲食"],
  "cost-calculator": ["保險", "費用", "花費", "獸醫", "領養"],
  "breed-match": ["品種", "新手養", "第一次", "社會化"],
  "breed-compare": ["品種", "個性", "體型"],
  "name-generator": ["新手養", "幼犬", "幼貓", "領養"],
  "vaccine-reminder": ["疫苗", "接種", "驅蟲", "幼犬"],
  "food-compare": ["飼料", "飲食", "成分", "乾糧"],
  "toxic-checker": ["中毒", "毒物", "禁忌食物", "食物"],
  "emergency-guide": ["急救", "中暑", "中毒", "緊急", "嘔吐"],
  "vet-prep": ["就醫", "獸醫", "健康檢查"],
};

import { getAllArticles } from "./articles";
import type { ArticleMeta } from "@/types";

export function getRelatedArticlesForTool(
  toolSlug: string,
  limit = 3,
): ArticleMeta[] {
  const matchTerms = TOOL_ARTICLE_MATCH[toolSlug];
  if (!matchTerms || matchTerms.length === 0) return [];

  const all = getAllArticles();
  const scored = all.map((a) => {
    const haystack = `${a.title} ${a.description} ${a.keywords.join(" ")}`;
    let score = 0;
    for (const term of matchTerms) {
      if (haystack.includes(term)) score++;
    }
    return { article: a, score };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.article);
}
