import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "常見問題 FAQ — 養狗養貓新手必問",
  description:
    "整理飼主最常問的 20+ 個問題：疫苗、驅蟲、飲食、訓練、結紮、健檢等。新手飼主必看的養寵懶人包。",
  keywords: ["寵物 FAQ", "養狗常見問題", "養貓常見問題", "寵物新手"],
  path: "/faq",
});

const FAQS: { q: string; a: string }[] = [
  {
    q: "幼犬幼貓什麼時候該打第一劑疫苗？",
    a: "幼犬建議在 6-8 週齡施打第一劑（五合一），幼貓則是 8 週齡（貓三合一）。完整基礎免疫需要 3-4 劑，每劑間隔 3-4 週。詳見疫苗時程表工具。",
  },
  {
    q: "狂犬病疫苗是強制的嗎？",
    a: "是的，台灣動物保護法規定，滿 3 個月以上的犬貓每年必須接種狂犬病疫苗，違者罰款 3-15 萬元。",
  },
  {
    q: "寵物結紮的最佳時機是？",
    a: "沒有單一最佳答案。時機會受物種、性別、體型、品種、健康狀況與繁殖風險影響；大型犬尤其常需要和獸醫討論骨骼成熟與疾病風險後再決定。",
  },
  {
    q: "狗狗每天該吃多少飼料？",
    a: "依體重、年齡、活動量、是否絕育計算每日熱量需求（RER × 生理係數），再除以飼料熱量密度。可用餵食計算機直接算出。",
  },
  {
    q: "貓咪可以只吃乾糧嗎？",
    a: "有些貓可以用完整均衡乾糧維持營養，但貓咪飲水量常偏少，泌尿道或腎臟風險貓更需要注意水分。可和獸醫討論濕食比例、飲水設備與定期健檢。",
  },
  {
    q: "多久該帶寵物做一次健康檢查？",
    a: "成年犬貓每年 1 次；7 歲以上老年犬貓建議每半年 1 次。基礎項目包含血液檢查、尿液檢查、糞便檢查。",
  },
  {
    q: "狗狗可以吃什麼水果？",
    a: "可以：蘋果（去籽）、香蕉、藍莓、西瓜（去籽）、草莓、芒果（去皮去籽）。禁止：葡萄、葡萄乾、酪梨、楊桃、櫻桃籽。",
  },
  {
    q: "貓咪為什麼會亂尿尿？",
    a: "首先就醫排除泌尿道疾病。非醫療原因包括：砂盆太髒、砂盆位置不好、貓砂不合、壓力焦慮、多貓衝突、未絕育標記行為等。",
  },
  {
    q: "幼犬咬人怎麼辦？",
    a: "幼犬咬人常和換牙、探索與興奮有關。先提供合適咬咬玩具，被咬時短暫停止互動，等牠冷靜再回到遊戲；若越咬越激烈，代表牠需要休息或降低刺激。",
  },
  {
    q: "狗狗分離焦慮如何改善？",
    a: "漸進式減敏訓練：1 分鐘短離開 → 逐步延長到 1 小時。搭配 Kong 玩具、留有主人氣味的舊衣、足夠的日常運動與心智刺激。嚴重案例需諮詢行為獸醫師。",
  },
  {
    q: "多久該幫狗狗洗澡？",
    a: "室內短毛犬 2-4 週 1 次、室內長毛犬 1-2 週 1 次、經常戶外活動每週 1 次、雙層被毛犬（哈士奇、柴犬）每 1-2 個月 1 次。過度洗澡會破壞皮膚油脂。",
  },
  {
    q: "狗狗指甲多久剪一次？",
    a: "每天戶外散步的狗狗 3-4 週 1 次、室內犬 1-2 週 1 次。聽到「喀喀喀」走路聲音就是該剪了。避開粉紅色血線。",
  },
  {
    q: "貓砂怎麼選？",
    a: "礦砂最便宜凝結力強但粉塵多；豆腐砂環保可沖馬桶；松木砂需雙層便盆；紙砂適合術後；玉米砂天然但價格高。第一次養貓建議買小包試多款。",
  },
  {
    q: "寵物可以只吃人食嗎？",
    a: "不建議把一般人食當長期主食。調味、油脂、鈣磷比例與微量營養素都可能不適合犬貓；若要長期自煮，應由獸醫或獸醫營養專業人員設計配方。",
  },
  {
    q: "寵物保險值得買嗎？",
    a: "視個人預算與風險承受度而定。比較時請看等待期、自負額、年度上限、既往症與除外項目；即使買保險，也建議保留緊急醫療基金。",
  },
  {
    q: "狗狗夏天中暑怎麼辦？",
    a: "立即移到陰涼通風處，用常溫到微涼的水降溫並搭配風扇，同時聯絡動物醫院。不要用冰水整隻浸泡、不要強灌水；車內任何時間都不應獨留寵物。",
  },
  {
    q: "老貓慢性腎病有哪些警訊？",
    a: "多喝多尿、食慾變差、體重下降、毛髮粗糙、嘔吐增加、口臭加重、活動力降低。建議 7 歲起每年血檢與尿檢。",
  },
  {
    q: "寵物打跳蚤壁蝨預防藥該多久一次？",
    a: "滴劑與口服藥多數每月 1 次，項圈可持續 6-8 個月。台灣氣候一年四季都需預防，不要冬天就停藥。",
  },
  {
    q: "寵物牙齒該怎麼保健？",
    a: "使用寵物專用牙刷與牙膏，從短時間、低壓力開始練習。是否需要專業洗牙與頻率，依牙結石、口臭、牙齦狀態與獸醫檢查決定。",
  },
  {
    q: "多貓家庭砂盆需要幾個？",
    a: "公式是 N+1（貓咪數量 +1）。1 隻貓要 2 個、2 隻貓要 3 個。分散在不同房間，避免搶用引起壓力。",
  },
];

export default function FAQPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };

  return (
    <>
      <JsonLd data={faqSchema} />
      <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <Breadcrumb items={[{ label: "首頁", href: "/" }, { label: "常見問題" }]} />
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-ink-900 mb-3">
            常見問題 FAQ
          </h1>
          <p className="text-ink-500">新手飼主最常問的 20 個問題</p>
        </div>
        <div className="space-y-3">
          {FAQS.map((f, i) => (
            <details
              key={i}
              className="group border border-cream-300 bg-[var(--surface-card)] rounded-[14px] overflow-hidden"
            >
              <summary className="cursor-pointer px-5 py-4 font-semibold text-ink-900 flex items-center justify-between hover:bg-cream-50 transition-colors">
                <span className="flex-1 pr-4">{f.q}</span>
                <span className="text-brand-500 text-xl group-open:rotate-45 transition-transform" aria-hidden="true">+</span>
              </summary>
              <div className="px-5 pb-4 text-ink-700 leading-relaxed text-sm md:text-base border-t border-cream-200 pt-3">
                {f.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </>
  );
}
