import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { getAllArticles, TAGS } from "@/lib/articles";
import { getAllBreeds } from "@/data/breeds";
import { BREED_TRAITS } from "@/lib/breed-traits";
import type { ArticleCategory } from "@/types";

const DATE_SITE_UPDATED = new Date("2026-05-08T00:00:00.000Z");
const DATE_CONTENT_REVIEWED = new Date("2026-04-30T00:00:00.000Z");
const DATE_SITE_LAUNCHED = new Date("2026-04-06T00:00:00.000Z");
type ArticleWithOptionalUpdatedAt = ReturnType<typeof getAllArticles>[number] & {
  updatedAt?: string;
};

const ARTICLE_CATEGORIES: ArticleCategory[] = [
  "health",
  "food",
  "behavior",
  "grooming",
  "beginner",
];

function latestArticleDate(category?: ArticleCategory) {
  const dates = getAllArticles()
    .filter((article) => !category || article.category === category)
    .map((article) => {
      const datedArticle = article as ArticleWithOptionalUpdatedAt;
      return new Date(datedArticle.updatedAt ?? datedArticle.publishedAt).getTime();
    });

  return new Date(Math.max(...dates));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const latestArticleUpdate = latestArticleDate();
  const base: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: DATE_SITE_UPDATED, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/tools`, lastModified: DATE_SITE_LAUNCHED, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/articles`, lastModified: DATE_SITE_UPDATED, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/breeds`, lastModified: DATE_SITE_LAUNCHED, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/about`, lastModified: DATE_CONTENT_REVIEWED, changeFrequency: "yearly", priority: 0.5 },
    { url: `${SITE_URL}/editorial-policy`, lastModified: DATE_CONTENT_REVIEWED, changeFrequency: "yearly", priority: 0.5 },
    { url: `${SITE_URL}/sources`, lastModified: DATE_CONTENT_REVIEWED, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/contact`, lastModified: DATE_CONTENT_REVIEWED, changeFrequency: "yearly", priority: 0.5 },
    { url: `${SITE_URL}/faq`, lastModified: DATE_CONTENT_REVIEWED, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/tools/pet-age`, lastModified: DATE_SITE_LAUNCHED, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/tools/vaccine-schedule`, lastModified: DATE_SITE_LAUNCHED, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/tools/symptom-checker`, lastModified: DATE_SITE_LAUNCHED, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/tools/food-calculator`, lastModified: DATE_SITE_LAUNCHED, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/tools/weight-tracker`, lastModified: DATE_SITE_LAUNCHED, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/tools/cost-calculator`, lastModified: DATE_CONTENT_REVIEWED, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/tools/breed-match`, lastModified: DATE_SITE_LAUNCHED, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/tools/name-generator`, lastModified: DATE_SITE_LAUNCHED, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/tools/vaccine-reminder`, lastModified: DATE_SITE_LAUNCHED, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/tools/breed-compare`, lastModified: DATE_SITE_LAUNCHED, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/tools/toxic-checker`, lastModified: DATE_SITE_LAUNCHED, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/tools/emergency-guide`, lastModified: DATE_SITE_LAUNCHED, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/tools/food-compare`, lastModified: DATE_SITE_LAUNCHED, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/tools/vet-prep`, lastModified: DATE_SITE_LAUNCHED, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/privacy`, lastModified: DATE_SITE_LAUNCHED, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/terms`, lastModified: DATE_SITE_LAUNCHED, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/sitemap`, lastModified: latestArticleUpdate, changeFrequency: "weekly", priority: 0.4 },
  ];

  const categories: MetadataRoute.Sitemap = ARTICLE_CATEGORIES.map((category) => ({
    url: `${SITE_URL}/articles/category/${category}`,
    lastModified: latestArticleDate(category),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const articles: MetadataRoute.Sitemap = getAllArticles().map((a) => ({
    url: `${SITE_URL}/articles/${a.slug}`,
    lastModified: new Date((a as ArticleWithOptionalUpdatedAt).updatedAt ?? a.publishedAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const breeds: MetadataRoute.Sitemap = getAllBreeds().map((b) => ({
    url: `${SITE_URL}/breeds/${b.slug}`,
    lastModified: DATE_SITE_LAUNCHED,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const tags: MetadataRoute.Sitemap = TAGS.map((t) => ({
    url: `${SITE_URL}/articles/tag/${t.slug}`,
    lastModified: DATE_SITE_UPDATED,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const traits: MetadataRoute.Sitemap = BREED_TRAITS.map((t) => ({
    url: `${SITE_URL}/breeds/trait/${t.slug}`,
    lastModified: DATE_SITE_LAUNCHED,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...base, ...categories, ...articles, ...breeds, ...tags, ...traits];
}
