import type { ArticleMeta, ArticleCategory } from "@/types";

/**
 * 文章 metadata 集中管理
 * 每篇 MDX 檔案（src/content/articles/{slug}.mdx）都必須在此註冊
 */
export const ARTICLES: ArticleMeta[] = [
  {
    slug: "puppy-first-year",
    title: "幼犬第一年完全照護指南",
    description:
      "從接回家第一天到滿週歲，完整說明幼犬的疫苗、驅蟲、飲食、社會化、訓練，新手飼主必讀。",
    category: "beginner",
    keywords: ["幼犬照顧", "小狗怎麼養", "幼犬飼養", "新手養狗", "幼犬疫苗"],
    publishedAt: "2026-04-06",
    readingMinutes: 8,
  },
  {
    slug: "cat-vomiting-reasons",
    title: "貓咪嘔吐的 8 個常見原因",
    description:
      "毛球、吃太快、食物過敏、慢性腎病⋯⋯解析貓咪嘔吐的常見原因與嚴重程度判斷，並告訴你何時該立即就醫。",
    category: "health",
    keywords: ["貓嘔吐", "貓吐原因", "貓咪一直吐", "貓毛球症", "貓腎病"],
    publishedAt: "2026-04-06",
    readingMinutes: 7,
  },
  {
    slug: "dog-safe-fruits",
    title: "狗狗可以吃什麼水果？20 種常見水果完整清單",
    description:
      "蘋果、香蕉、藍莓可以吃；葡萄、酪梨、楊桃千萬別碰。完整整理台灣常見 20 種水果的狗狗食用指南。",
    category: "food",
    keywords: ["狗可以吃的水果", "狗狗水果", "狗葡萄中毒", "狗可以吃香蕉嗎"],
    publishedAt: "2026-04-06",
    readingMinutes: 8,
  },
  {
    slug: "new-cat-owner-first-month",
    title: "新手養貓必讀：第一個月完整待辦清單",
    description:
      "從接貓回家前的用品準備，到第 1-4 週的適應期照顧重點，按週排列的新手養貓指南，不慌不漏。",
    category: "beginner",
    keywords: ["新手養貓", "第一次養貓", "養貓準備", "貓咪用品", "養貓注意事項"],
    publishedAt: "2026-04-06",
    readingMinutes: 9,
  },
  {
    slug: "senior-dog-care",
    title: "老犬照護全攻略：從 7 歲開始的健康管理",
    description:
      "健檢、飲食、關節、認知、牙齒、陪伴——老犬照護的 6 大面向完整解析，陪他有尊嚴地走過晚年。",
    category: "health",
    keywords: ["老狗照顧", "高齡犬", "老犬關節炎", "老狗飲食", "犬認知障礙"],
    publishedAt: "2026-04-06",
    readingMinutes: 10,
  },
  {
    slug: "dog-overweight-check",
    title: "如何判斷狗狗是否過胖？體態評分完整解析",
    description:
      "超過 50% 台灣狗狗體重過重。用 BCS 體態評分 3 步驟居家檢查，學會健康減重方法。",
    category: "health",
    keywords: ["狗體重標準", "狗過胖", "狗狗減重", "BCS 體態評分", "狗肥胖"],
    publishedAt: "2026-04-06",
    readingMinutes: 7,
  },
  {
    slug: "cat-kidney-disease",
    title: "貓咪慢性腎病：7 個早期警訊與飲食控制",
    description:
      "慢性腎病是 10 歲以上貓咪頭號殺手，罹病率 30-40%。學會早期警訊、檢查指標與飲食管理，延緩惡化。",
    category: "health",
    keywords: ["貓腎病", "貓腎衰竭", "CKD", "貓慢性腎病", "老貓飲食"],
    publishedAt: "2026-04-06",
    readingMinutes: 8,
  },
  {
    slug: "cat-toxic-foods",
    title: "貓咪絕對不能吃的 15 種食物",
    description:
      "洋蔥、巧克力、百合、木糖醇⋯⋯完整整理家中常見卻對貓咪劇毒的 15 種食物，誤食處理方式一次看。",
    category: "food",
    keywords: ["貓不能吃", "貓中毒", "貓食物禁忌", "貓百合中毒", "貓洋蔥中毒"],
    publishedAt: "2026-04-06",
    readingMinutes: 7,
  },
  {
    slug: "dog-barking-training",
    title: "狗狗吠叫訓練：5 個方法從根本解決愛叫",
    description:
      "狗狗為什麼一直叫？辨識吠叫原因、正向增強訓練、去敏感化技巧，4 週改善過度吠叫行為。",
    category: "behavior",
    keywords: ["狗狗愛叫", "狗狗訓練", "狗吠叫", "分離焦慮", "犬行為"],
    publishedAt: "2026-04-06",
    readingMinutes: 6,
  },
  {
    slug: "cat-inappropriate-urination",
    title: "貓咪為什麼會亂尿尿？6 個常見原因與解法",
    description:
      "泌尿道疾病、砂盆問題、壓力焦慮、多貓衝突⋯⋯解析貓咪亂尿的真正原因，提供對應解法。",
    category: "behavior",
    keywords: ["貓亂尿尿", "貓不用貓砂", "貓行為", "貓噴尿", "貓泌尿道"],
    publishedAt: "2026-04-06",
    readingMinutes: 7,
  },
  {
    slug: "puppy-biting-training",
    title: "幼犬咬人怎麼辦？4 週正確阻止咬人訓練",
    description:
      "幼犬咬人是換牙與探索正常行為。4 週循序漸進訓練法：建立痛感、替代行為、暫停法、延長寧靜，輕鬆解決。",
    category: "behavior",
    keywords: ["幼犬咬人", "小狗咬人", "狗狗訓練", "換牙期", "幼犬行為"],
    publishedAt: "2026-04-06",
    readingMinutes: 6,
  },
  {
    slug: "dog-nail-trimming",
    title: "狗狗剪指甲完整步驟：避開血線不流血",
    description:
      "狗狗指甲過長傷關節！學會判斷指甲血線、正確剪指甲步驟、止血處理，讓狗狗不再害怕剪指甲。",
    category: "grooming",
    keywords: ["狗剪指甲", "狗指甲血線", "狗狗美容", "指甲出血", "剪指甲技巧"],
    publishedAt: "2026-04-06",
    readingMinutes: 6,
  },
  {
    slug: "cat-litter-comparison",
    title: "貓砂怎麼選？6 種貓砂完整比較",
    description:
      "礦砂、豆腐砂、松木砂、水晶砂、紙砂、玉米砂完整比較！凝結、除臭、粉塵、價格一次搞懂，找到最適合你家貓咪的那款。",
    category: "grooming",
    keywords: ["貓砂推薦", "貓砂比較", "礦砂豆腐砂", "貓砂選擇", "貓砂種類"],
    publishedAt: "2026-04-06",
    readingMinutes: 8,
  },
  {
    slug: "dog-bathing-guide",
    title: "狗狗洗澡頻率與正確方法完整指南",
    description:
      "洗太勤傷皮膚、洗太少易臭！依品種判斷頻率、選擇適合洗毛精、6 步驟完整洗澡流程，在家自己也能洗得乾淨。",
    category: "grooming",
    keywords: ["狗狗洗澡", "洗澡頻率", "狗洗毛精", "寵物美容", "狗狗清潔"],
    publishedAt: "2026-04-06",
    readingMinutes: 7,
  },
  {
    slug: "dog-water-intake",
    title: "狗狗每天該喝多少水？缺水警訊與 8 個補水技巧",
    description:
      "每公斤體重需 50-60 ml 水！皮膚彈性測試脫水、讓狗狗多喝水的 8 個方法、喝水量異常的警訊。",
    category: "food",
    keywords: ["狗喝水", "狗狗脫水", "狗狗飲水量", "狗中暑", "多喝多尿"],
    publishedAt: "2026-04-06",
    readingMinutes: 6,
  },
  {
    slug: "cat-hair-loss",
    title: "貓咪掉毛是正常還是生病？7 個可能原因",
    description: "換毛季 vs 異常禿斑如何分辨？跳蚤過敏、貓癬、甲狀腺機能亢進等 7 個掉毛原因與處理方式。",
    category: "health",
    keywords: ["貓掉毛", "貓禿斑", "貓咪皮膚病", "貓癬", "貓換毛"],
    publishedAt: "2026-04-06",
    readingMinutes: 5,
  },
  {
    slug: "dog-neuter-guide",
    title: "狗狗結紮完整指南：利弊、時機、術後照護",
    description: "該不該結紮？什麼時候結紮？公犬 4-8 千、母犬 6-12 千，獸醫建議時機與術後 7 天照護重點。",
    category: "health",
    keywords: ["狗狗結紮", "狗絕育", "結紮時機", "絕育好處", "術後照護"],
    publishedAt: "2026-04-06",
    readingMinutes: 6,
  },
  {
    slug: "dog-poop-health",
    title: "從狗狗便便看健康：顏色、形狀、氣味解析",
    description: "狗便便顏色異常警訊對照表！黑色、紅色、白色、綠色便便各代表什麼？形狀硬度判斷法。",
    category: "health",
    keywords: ["狗便便", "狗狗血便", "狗便便顏色", "狗腹瀉", "狗便秘"],
    publishedAt: "2026-04-06",
    readingMinutes: 5,
  },
  {
    slug: "cat-meow-meanings",
    title: "貓咪叫聲的 10 種含意，學會跟貓咪對話",
    description: "短促喵、拉長喵、咕嚕咕嚕、嘶嘶⋯⋯解析 10 種貓叫含意與情境，讀懂毛孩的心情。",
    category: "behavior",
    keywords: ["貓叫聲", "貓叫含意", "貓咪溝通", "貓語言", "貓行為"],
    publishedAt: "2026-04-06",
    readingMinutes: 5,
  },
  {
    slug: "dog-separation-anxiety",
    title: "狗狗分離焦慮完整解析：5 個徵兆與漸進訓練",
    description: "你出門他就崩潰嗎？分離焦慮的 5 個徵兆、3 階段減敏訓練、7 個實用技巧，幫毛孩克服獨處恐懼。",
    category: "behavior",
    keywords: ["狗狗分離焦慮", "狗狗獨處", "犬分離焦慮", "狗狗訓練", "焦慮症"],
    publishedAt: "2026-04-06",
    readingMinutes: 6,
  },
  {
    slug: "pet-flea-tick-guide",
    title: "寵物跳蚤壁蝨完整預防指南",
    description: "台灣跳蚤壁蝨一年四季活躍！4 種預防產品比較、發現跳蚤的處理、壁蝨拔除的正確方法。",
    category: "health",
    keywords: ["寵物跳蚤", "狗壁蝨", "貓跳蚤", "驅蟲", "滴劑"],
    publishedAt: "2026-04-06",
    readingMinutes: 6,
  },
  {
    slug: "senior-cat-diet",
    title: "老貓飲食調整完整攻略：10 歲以上必看",
    description: "老貓腎功能、消化能力下降，飲食需要調整。增加水分、優質蛋白、低磷低鈉的 5 個原則。",
    category: "food",
    keywords: ["老貓飲食", "老貓腎病", "高齡貓", "貓處方飼料", "老貓照護"],
    publishedAt: "2026-04-06",
    readingMinutes: 6,
  },
  {
    slug: "dog-heatstroke-prevention",
    title: "狗狗中暑預防與急救完整指南",
    description: "台灣夏天狗狗中暑每年致死！8 個中暑徵兆、5 步驟急救、8 個預防原則，車內溫度可怕真相。",
    category: "health",
    keywords: ["狗狗中暑", "狗熱衰竭", "夏天養狗", "中暑急救", "短吻犬中暑"],
    publishedAt: "2026-04-06",
    readingMinutes: 7,
  },
  {
    slug: "puppy-potty-training",
    title: "幼犬如廁訓練：4 週學會定點大小便",
    description: "幼犬每 1-2 小時要尿尿！4 週訓練計畫、常見問題 FAQ、正確的清潔方式，讓毛孩建立好習慣。",
    category: "beginner",
    keywords: ["幼犬如廁訓練", "狗狗定點尿尿", "幼犬訓練", "尿布墊", "狗狗大小便"],
    publishedAt: "2026-04-06",
    readingMinutes: 6,
  },
  {
    slug: "cat-scratching-post-guide",
    title: "貓抓板完整選購指南：6 個引導技巧",
    description: "瓦楞紙、劍麻、地毯、木頭 5 種貓抓板比較！為什麼你家貓不用？6 個引導技巧與正確位置。",
    category: "behavior",
    keywords: ["貓抓板", "貓抓沙發", "貓爪磨", "貓抓柱", "貓行為"],
    publishedAt: "2026-04-06",
    readingMinutes: 6,
  },
  {
    slug: "pet-dental-care",
    title: "寵物牙齒保健完整指南：預防 85% 牙周病",
    description: "3 歲以上犬貓 85% 有牙周病！4 階段牙周病、3 種居家潔牙方式、專業洗牙時機與費用。",
    category: "grooming",
    keywords: ["寵物牙齒", "狗刷牙", "貓洗牙", "寵物牙周病", "寵物口臭"],
    publishedAt: "2026-04-06",
    readingMinutes: 7,
  },
  { slug: "dog-grass-eating", title: "狗狗為什麼一直吃草？5 個原因解析", description: "超過 80% 的健康狗會吃草。5 個常見原因、什麼時候該擔心、如何減少吃草行為。", category: "behavior", keywords: ["狗吃草", "狗狗吃草原因", "狗嘔吐"], publishedAt: "2026-04-06", readingMinutes: 4 },
  { slug: "cat-purring-meaning", title: "貓咪咕嚕聲的 4 種含意：不只是開心", description: "滿足、求食、自我療癒、焦慮——解析貓咪咕嚕聲的真正含意。", category: "behavior", keywords: ["貓咕嚕", "貓呼嚕", "貓聲音"], publishedAt: "2026-04-06", readingMinutes: 4 },
  { slug: "pet-insurance-guide", title: "寵物保險值得買嗎？台灣方案完整比較", description: "台灣寵物保險費用比較、適合買 vs 不需要、購買前注意事項。", category: "beginner", keywords: ["寵物保險", "狗保險", "貓保險"], publishedAt: "2026-04-06", readingMinutes: 5 },
  { slug: "dog-homemade-food", title: "狗狗鮮食入門：3 道簡單食譜與注意事項", description: "鮮食優缺點、3 道入門食譜、絕對不能加的食材。", category: "food", keywords: ["狗鮮食", "狗食譜", "自製飼料"], publishedAt: "2026-04-06", readingMinutes: 5 },
  { slug: "pet-travel-guide", title: "帶毛孩旅行完整攻略", description: "交通方式比較、行前準備清單、住宿選擇。", category: "beginner", keywords: ["帶狗旅行", "寵物旅行", "寵物友善"], publishedAt: "2026-04-06", readingMinutes: 6 },
  { slug: "cat-indoor-enrichment", title: "室內貓環境豐富化：5 大原則", description: "垂直空間、躲藏空間、狩獵模擬、感官刺激、社交互動。", category: "behavior", keywords: ["室內貓", "貓環境", "貓玩具"], publishedAt: "2026-04-06", readingMinutes: 5 },
  { slug: "dog-ear-care", title: "狗狗耳朵清潔完整指南", description: "不同耳型清潔頻率、正確步驟、就醫警訊。", category: "grooming", keywords: ["狗耳朵清潔", "狗耳朵臭", "狗中耳炎"], publishedAt: "2026-04-06", readingMinutes: 5 },
  { slug: "cat-carrier-training", title: "貓咪外出籠訓練：7 天減壓法", description: "7 天漸進訓練法、外出籠選擇、就醫減壓技巧。", category: "behavior", keywords: ["貓外出籠", "貓看醫生", "貓訓練"], publishedAt: "2026-04-06", readingMinutes: 5 },
  { slug: "dog-leash-training", title: "牽繩散步訓練：3 週告別暴衝", description: "鬆繩散步 3 週訓練法、工具選擇、常見錯誤。", category: "behavior", keywords: ["狗拉繩", "狗暴衝", "鬆繩散步"], publishedAt: "2026-04-06", readingMinutes: 5 },
  { slug: "pet-summer-care", title: "寵物夏季照護 8 大重點", description: "防中暑、防曬、飲水、防蚊蟲、柏油路測試。", category: "health", keywords: ["寵物夏天", "狗防曬", "寵物中暑"], publishedAt: "2026-04-06", readingMinutes: 5 },
  { slug: "cat-sneezing-causes", title: "貓咪一直打噴嚏？6 個原因", description: "灰塵、上呼吸道感染、過敏、鼻腔異物。", category: "health", keywords: ["貓打噴嚏", "貓感冒", "貓鼻水"], publishedAt: "2026-04-06", readingMinutes: 4 },
  { slug: "dog-socialization", title: "狗狗社會化完整指南：黃金期 3-14 週", description: "社會化清單、正確方式、錯過黃金期補救。", category: "behavior", keywords: ["狗社會化", "幼犬社會化", "狗害怕"], publishedAt: "2026-04-06", readingMinutes: 6 },
  { slug: "pet-adoption-guide", title: "領養毛孩完整指南", description: "領養前自我評估、管道、流程、第一週。", category: "beginner", keywords: ["領養", "認養", "收容所"], publishedAt: "2026-04-06", readingMinutes: 5 },
  { slug: "dog-food-brand-comparison", title: "狗飼料怎麼選？成分表判讀與等級分析", description: "看懂成分表 5 個關鍵、台灣飼料等級分類、乾糧 vs 濕食比較、換飼料正確方式。", category: "food", keywords: ["狗飼料推薦", "飼料比較", "狗飼料品牌", "飼料成分"], publishedAt: "2026-04-06", readingMinutes: 8 },
  { slug: "how-to-choose-vet", title: "怎麼選獸醫院？8 個評估標準完整指南", description: "距離、設備、溝通方式、收費透明度、口碑——8 個標準幫你找到值得信賴的獸醫師。", category: "health", keywords: ["獸醫推薦", "獸醫院怎麼選", "動物醫院", "看診費用"], publishedAt: "2026-04-06", readingMinutes: 7 },
  { slug: "cat-tree-buying-guide", title: "貓跳台選購完整指南：6 大標準不踩雷", description: "高度、穩定性、材質、功能、尺寸、可拆洗——選購貓跳台的 6 個關鍵標準與價格分析。", category: "grooming", keywords: ["貓跳台推薦", "貓跳台選購", "貓傢俱", "貓塔"], publishedAt: "2026-04-06", readingMinutes: 6 },
  {
    slug: "cat-food-guide",
    title: "貓飼料怎麼選？乾糧、濕食、生食完整比較指南",
    description: "絕對肉食性動物的貓咪，飼料選錯影響一生健康。乾糧 vs 濕食 vs 生食完整比較、成分表判讀 4 原則、各生命階段選擇重點。",
    category: "food",
    keywords: ["貓飼料推薦", "貓咪飲食", "貓乾糧濕食", "貓飼料成分", "貓生食"],
    publishedAt: "2026-04-13",
    readingMinutes: 9,
  },
  {
    slug: "dog-spring-shedding",
    title: "春天換季狗狗大量掉毛怎麼辦？完整梳毛指南與工具推薦",
    description: "春天換毛季來了！為什麼毛掉這麼多？哪些是異常訊號？正確梳毛工具、6 步驟梳毛法、魚油補充重點，一篇搞定換毛期照護。",
    category: "grooming",
    keywords: ["狗掉毛", "換毛期", "狗春天掉毛", "梳毛工具", "脫毛刷"],
    publishedAt: "2026-04-13",
    readingMinutes: 8,
  },
];

export const CATEGORY_LABELS: Record<ArticleCategory, string> = {
  health: "健康",
  food: "飲食",
  behavior: "行為",
  grooming: "美容",
  beginner: "新手指南",
};

export const CATEGORY_COLORS: Record<ArticleCategory, string> = {
  health: "bg-red-100 text-red-700",
  food: "bg-orange-100 text-orange-700",
  behavior: "bg-purple-100 text-purple-700",
  grooming: "bg-blue-100 text-blue-700",
  beginner: "bg-accent-100 text-accent-700",
};

export function getAllArticles(): ArticleMeta[] {
  return [...ARTICLES].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

export function getArticleBySlug(slug: string): ArticleMeta | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

export function getArticlesByCategory(
  category: ArticleCategory,
): ArticleMeta[] {
  return getAllArticles().filter((a) => a.category === category);
}

// 標籤系統（curated）：以編輯精選的主題 tag 聚合文章，
// 比單純從 keywords 計數更有 SEO 深度（每個 tag 頁都是豐富的主題集錦）。
// slug 用英文以避免 URL 編碼；label 顯示中文。
export interface TagDef {
  slug: string;
  label: string;
  description: string;
  // 命中條件：文章的 title/description/keywords 出現任一關鍵字即計入
  match: string[];
}

export const TAGS: TagDef[] = [
  {
    slug: "new-owner",
    label: "新手飼主",
    description: "第一次養狗養貓要準備什麼？幼犬幼貓照護、用品清單、領養評估、寵物保險完整指南。",
    match: ["幼犬", "幼貓", "小狗", "小貓", "新手養", "第一次養", "養貓準備", "養狗準備", "領養", "認養", "寵物保險"],
  },
  {
    slug: "senior",
    label: "老犬老貓",
    description: "7-10 歲以上犬貓的健康檢查、飲食調整、關節照護、慢性疾病管理專區。",
    match: ["老狗", "老犬", "高齡犬", "老貓", "高齡貓", "認知障礙"],
  },
  {
    slug: "training",
    label: "行為訓練",
    description: "吠叫、咬人、分離焦慮、拉繩暴衝、亂尿尿等常見行為問題的正向訓練方法。",
    match: ["訓練", "行為", "分離焦慮", "吠叫", "咬人", "暴衝", "社會化"],
  },
  {
    slug: "food",
    label: "飲食營養",
    description: "飼料選擇、鮮食入門、水分補充、禁忌食物、各生命階段營養需求完整指南。",
    match: ["飼料", "飲食", "食譜", "鮮食", "水果", "禁忌食物", "喝水", "中毒"],
  },
  {
    slug: "health",
    label: "疾病預防",
    description: "腎病、皮膚病、中暑、跳蚤壁蝨、結紮、體重管理等疾病預防與早期警訊。",
    match: ["腎病", "腎衰竭", "皮膚", "掉毛", "中暑", "跳蚤", "壁蝨", "結紮", "減重", "過胖", "BCS", "驅蟲"],
  },
  {
    slug: "grooming",
    label: "美容清潔",
    description: "洗澡、剪指甲、刷牙、清耳朵、梳毛、貓砂選擇等美容與日常清潔教學。",
    match: ["洗澡", "剪指甲", "刷牙", "牙齒", "耳朵", "梳毛", "貓砂", "美容", "洗毛精"],
  },
  {
    slug: "communication",
    label: "讀懂毛孩",
    description: "貓叫聲、咕嚕聲、狗狗吃草、便便觀察等毛孩行為語言的解讀指南。",
    match: ["叫聲", "咕嚕", "吃草", "便便", "溝通", "語言", "含意"],
  },
  {
    slug: "travel",
    label: "外出旅行",
    description: "帶毛孩旅行、外出籠訓練、寵物友善住宿、夏季外出照護等實用技巧。",
    match: ["旅行", "外出籠", "外出", "寵物友善", "夏天", "夏季"],
  },
  {
    slug: "emergency",
    label: "緊急急救",
    description: "中暑、中毒、出血、嘔吐、誤食毒物等緊急狀況的急救步驟與就醫時機判斷。",
    match: ["中暑", "急救", "中毒", "嘔吐", "血便", "誤食", "毒"],
  },
];

export function getAllTags(): Array<TagDef & { count: number }> {
  return TAGS.map((t) => ({
    ...t,
    count: getArticlesByTagSlug(t.slug).length,
  })).filter((t) => t.count > 0);
}

export function getTagBySlug(slug: string): TagDef | undefined {
  return TAGS.find((t) => t.slug === slug);
}

export function getArticlesByTagSlug(slug: string): ArticleMeta[] {
  const tag = getTagBySlug(slug);
  if (!tag) return [];
  return getAllArticles().filter((a) => {
    const haystack = `${a.title} ${a.description} ${a.keywords.join(" ")}`;
    return tag.match.some((m) => haystack.includes(m));
  });
}

// 找出一篇文章命中的所有 tag（供文章詳情頁顯示 tag chips）
export function getTagsForArticle(article: ArticleMeta): TagDef[] {
  const haystack = `${article.title} ${article.description} ${article.keywords.join(" ")}`;
  return TAGS.filter((t) => t.match.some((m) => haystack.includes(m)));
}

export function getArticleNeighbors(slug: string): {
  prev: ArticleMeta | null;
  next: ArticleMeta | null;
} {
  const list = getAllArticles(); // sorted newest first
  const idx = list.findIndex((a) => a.slug === slug);
  if (idx === -1 || list.length < 2) return { prev: null, next: null };
  // "prev" = older article (higher index), "next" = newer article (lower index)
  const prev = idx + 1 < list.length ? list[idx + 1] : null;
  const next = idx - 1 >= 0 ? list[idx - 1] : null;
  return { prev, next };
}

export function getRelatedArticles(slug: string, limit = 3): ArticleMeta[] {
  const current = getArticleBySlug(slug);
  if (!current) return [];
  const sameCategory = getAllArticles().filter(
    (a) => a.slug !== slug && a.category === current.category,
  );
  if (sameCategory.length >= limit) return sameCategory.slice(0, limit);
  // Fall back to other articles
  const others = getAllArticles().filter(
    (a) => a.slug !== slug && a.category !== current.category,
  );
  return [...sameCategory, ...others].slice(0, limit);
}
