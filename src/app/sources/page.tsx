import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Card } from "@/components/ui/Card";
import { ARTICLE_SOURCES } from "@/lib/article-sources";
import { getAllArticles } from "@/lib/articles";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "資料來源 — 寵物健康、營養、行為與台灣規範參考",
  description:
    "毛孩照護站的資料來源中心，整理文章常用的獸醫組織、政府機關、學術與動物醫院教學資源，說明我們如何引用與更新來源。",
  keywords: ["資料來源", "寵物健康資料", "獸醫來源", "寵物照護參考"],
  path: "/sources",
});

const sourcePrinciples = [
  {
    title: "健康與營養先看專業來源",
    body: "疾病、疫苗、營養、急症與毒物主題，優先引用獸醫組織、獸醫學校、動物醫院教學資源、政府機關或學術資料。",
  },
  {
    title: "台灣情境以官方與公開條款為準",
    body: "交通、認養、保險與法規資訊會優先查台灣官方頁面、業者公開條款與可回溯的公告，並提醒讀者仍需確認最新版本。",
  },
  {
    title: "每篇文章保留判斷界線",
    body: "本站會把來源轉成飼主可操作的檢查清單、就醫準備與風險提醒，但不把文章包裝成診斷、處方或急救替代方案。",
  },
];

const sourceGroups = [
  {
    title: "獸醫與動物醫院教學資源",
    description:
      "用於疾病介紹、症狀警訊、照護流程與就醫界線，幫助讀者分辨哪些狀況需要獸醫師介入。",
    publishers: [
      "Merck Veterinary Manual",
      "Cornell Feline Health Center",
      "Cornell Riney Canine Health Center",
      "VCA Animal Hospitals",
      "American Animal Hospital Association",
      "American Veterinary Medical Association",
    ],
  },
  {
    title: "貓犬生活階段與行為照護",
    description:
      "用於幼犬幼貓、老年照護、環境豐富化、社會化、分離焦慮與正向訓練等主題。",
    publishers: [
      "AAHA / AAFP",
      "Feline Veterinary Medical Association",
      "AAFP Cat Friendly Homes",
      "American Veterinary Society of Animal Behavior",
      "UC Davis School of Veterinary Medicine",
    ],
  },
  {
    title: "食品、毒物與營養安全",
    description:
      "用於犬貓可食與不可食食物、寵物食品選擇、肥胖判斷、飲水與營養均衡提醒。",
    publishers: [
      "WSAVA",
      "WSAVA Global Nutrition Committee",
      "U.S. Food and Drug Administration",
      "ASPCA Animal Poison Control",
      "Companion Animal Parasite Council",
      "Centers for Disease Control and Prevention",
    ],
  },
  {
    title: "台灣認養、交通與服務條款",
    description:
      "用於台灣飼主常見的認領養、帶寵搭車、旅宿寄宿與寵物保險比較情境。",
    publishers: [
      "農業部動物保護資訊網",
      "台灣高鐵",
      "台鐵公司",
      "富邦產險",
      "國泰產險",
    ],
  },
];

function buildArticleSourceRows() {
  const articlesBySlug = new Map(
    getAllArticles().map((article) => [article.slug, article]),
  );

  return Object.entries(ARTICLE_SOURCES)
    .map(([slug, sources]) => ({
      slug,
      article: articlesBySlug.get(slug),
      sources,
    }))
    .filter((item) => item.article)
    .sort((a, b) => a.article!.title.localeCompare(b.article!.title, "zh-Hant"));
}

function uniqueSourceStats(rows: ReturnType<typeof buildArticleSourceRows>) {
  const urls = new Set<string>();
  const publishers = new Set<string>();

  rows.forEach((row) => {
    row.sources.forEach((source) => {
      urls.add(source.url);
      publishers.add(source.publisher);
    });
  });

  return {
    articleCount: rows.length,
    sourceCount: urls.size,
    publisherCount: publishers.size,
  };
}

export default function SourcesPage() {
  const articleRows = buildArticleSourceRows();
  const stats = uniqueSourceStats(articleRows);

  return (
    <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      <Breadcrumb items={[{ label: "首頁", href: "/" }, { label: "資料來源" }]} />

      <header className="mb-10">
        <p className="text-sm font-semibold text-brand-600 mb-3">Source Center</p>
        <h1 className="text-3xl md:text-4xl font-extrabold text-ink-900 mb-4">
          資料來源與校對說明
        </h1>
        <p className="text-ink-600 leading-relaxed max-w-3xl">
          毛孩照護站的內容以「台灣飼主看得懂、用得到、知道何時該就醫」為目標。這一頁整理本站文章常用的資料來源類型、引用原則，以及目前已在文章頁標示的來源清單。
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        <Card padding="lg" className="bg-white">
          <p className="text-3xl font-extrabold text-brand-600">{stats.articleCount}</p>
          <p className="mt-2 text-sm font-semibold text-ink-900">篇文章已標示來源</p>
          <p className="mt-2 text-sm text-ink-500 leading-relaxed">
            每篇核心文章至少保留一組可回查來源。
          </p>
        </Card>
        <Card padding="lg" className="bg-white">
          <p className="text-3xl font-extrabold text-brand-600">{stats.sourceCount}</p>
          <p className="mt-2 text-sm font-semibold text-ink-900">個不重複來源連結</p>
          <p className="mt-2 text-sm text-ink-500 leading-relaxed">
            優先使用官方、獸醫、學術與公開條款頁面。
          </p>
        </Card>
        <Card padding="lg" className="bg-white">
          <p className="text-3xl font-extrabold text-brand-600">{stats.publisherCount}</p>
          <p className="mt-2 text-sm font-semibold text-ink-900">個發布單位</p>
          <p className="mt-2 text-sm text-ink-500 leading-relaxed">
            避免只依賴單一網站或無法查證的社群說法。
          </p>
        </Card>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-ink-900 mb-4">引用原則</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {sourcePrinciples.map((principle) => (
            <Card key={principle.title} padding="lg">
              <h3 className="text-lg font-bold text-ink-900 mb-2">
                {principle.title}
              </h3>
              <p className="text-sm text-ink-600 leading-relaxed">
                {principle.body}
              </p>
            </Card>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-ink-900 mb-4">常用來源類型</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sourceGroups.map((group) => (
            <Card key={group.title} padding="lg" className="bg-white">
              <h3 className="text-lg font-bold text-ink-900 mb-2">
                {group.title}
              </h3>
              <p className="text-sm text-ink-600 leading-relaxed mb-4">
                {group.description}
              </p>
              <ul className="space-y-2 text-sm text-ink-700">
                {group.publishers.map((publisher) => (
                  <li key={publisher} className="flex gap-2">
                    <span className="text-brand-500" aria-hidden="true">
                      ✓
                    </span>
                    <span>{publisher}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-ink-900 mb-4">
          文章來源索引
        </h2>
        <div className="space-y-4">
          {articleRows.map((row) => (
            <Card key={row.slug} padding="lg" className="bg-white">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                <div>
                  <h3 className="text-lg font-bold text-ink-900">
                    <Link
                      href={`/articles/${row.slug}`}
                      className="hover:text-brand-600"
                    >
                      {row.article!.title}
                    </Link>
                  </h3>
                  <p className="text-sm text-ink-500 mt-1">
                    已列出 {row.sources.length} 組主要參考資料
                  </p>
                </div>
                <Link
                  href={`/articles/${row.slug}`}
                  className="text-sm font-semibold text-brand-600 hover:underline"
                >
                  閱讀文章
                </Link>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-ink-700">
                {row.sources.map((source) => (
                  <li key={`${row.slug}-${source.url}`}>
                    <a
                      href={source.url}
                      rel="noopener noreferrer"
                      target="_blank"
                      className="font-semibold text-ink-900 hover:text-brand-600"
                    >
                      {source.title}
                    </a>
                    <span className="text-ink-500"> — {source.publisher}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </section>

      <section className="rounded-[20px] border border-brand-200 bg-brand-50 p-6 md:p-8">
        <h2 className="text-xl font-bold text-ink-900 mb-3">
          發現來源失效或內容需要補充？
        </h2>
        <p className="text-ink-700 leading-relaxed mb-4">
          若你發現來源連結失效、資料已更新、文章表述不清，或想提供更好的官方、獸醫學、學術資料，歡迎把頁面網址與建議來源寄給我們。我們會優先修正會影響飼主判斷的健康、安全與法規內容。
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-[14px] bg-brand-500 px-5 py-3 text-sm font-bold text-white hover:bg-brand-600"
          >
            聯絡編輯部
          </Link>
          <Link
            href="/editorial-policy"
            className="inline-flex items-center justify-center rounded-[14px] bg-white px-5 py-3 text-sm font-bold text-brand-600 border border-brand-200 hover:bg-brand-50"
          >
            查看編輯政策
          </Link>
        </div>
      </section>
    </div>
  );
}
