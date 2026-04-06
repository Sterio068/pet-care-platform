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
    a: "小型犬 6-9 月齡、中型犬 9-12 月齡、大型犬 12-18 月齡、貓咪 5-6 月齡。大型犬建議等骨骼發育完成再結紮。",
  },
  {
    q: "狗狗每天該吃多少飼料？",
    a: "依體重、年齡、活動量、是否絕育計算每日熱量需求（RER × 生理係數），再除以飼料熱量密度。可用餵食計算機直接算出。",
  },
  {
    q: "貓咪可以只吃乾糧嗎？",
    a: "不建議。貓咪天生飲水量少，長期只吃乾糧容易導致慢性腎病與泌尿道疾病。建議乾糧+濕食混餵，或至少定期餵濕食補水。",
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
    a: "幼犬咬人是換牙期正常行為。使用 4 週訓練法：被咬時模仿狗狗吠叫聲、替代行為給玩具、持續犯錯用暫停法、建立「輕咬 = 持續玩」的連結。",
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
    a: "絕對不行。人類食物鹽分、調味、營養配比都不適合寵物，長期會造成腎臟負擔、肥胖、營養失衡。應選擇完整均衡的寵物飼料。",
  },
  {
    q: "寵物保險值得買嗎？",
    a: "視個人狀況。月繳 400-600 元，適合預算有限但想分散突發醫療風險的飼主。建議搭配緊急醫療基金一起規劃。",
  },
  {
    q: "狗狗夏天中暑怎麼辦？",
    a: "立即移到陰涼處、用室溫水（不是冰水）濕毛巾包裹降溫、小口餵水、立即送醫。車內絕對不可獨留寵物，5 分鐘就可能致命。",
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
    a: "每週 2-3 次用寵物專用牙刷刷牙（不可用人用牙膏）、每年專業洗牙 1 次、搭配潔牙零食與玩具。85% 以上 3 歲犬貓有牙周病。",
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
              className="group border border-cream-300 bg-white rounded-[14px] overflow-hidden"
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
