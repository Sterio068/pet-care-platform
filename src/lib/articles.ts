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
      "從接回家第一天到滿週歲，按月齡整理幼犬疫苗、驅蟲、飲食、社會化與訓練重點，新手飼主可照表執行。",
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
    updatedAt: "2026-04-30",
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
    updatedAt: "2026-04-30",
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
    updatedAt: "2026-04-30",
    readingMinutes: 10,
  },
  {
    slug: "dog-overweight-check",
    title: "如何判斷狗狗是否過胖？體態評分完整解析",
    description:
      "用 BCS 體態評分、腰身與肋骨觸感判斷狗狗是否過胖，並整理安全減重前該先確認的健康條件。",
    category: "health",
    keywords: ["狗體重標準", "狗過胖", "狗狗減重", "BCS 體態評分", "狗肥胖"],
    publishedAt: "2026-04-06",
    updatedAt: "2026-04-30",
    readingMinutes: 7,
  },
  {
    slug: "cat-kidney-disease",
    title: "貓咪慢性腎病：7 個早期警訊與檢查重點",
    description:
      "慢性腎病是高齡貓常見問題。整理多喝多尿、體重下降、嘔吐等警訊，以及血檢、尿檢、血壓與飲食管理重點。",
    category: "health",
    keywords: ["貓腎病", "貓腎衰竭", "CKD", "貓慢性腎病", "老貓飲食"],
    publishedAt: "2026-04-06",
    updatedAt: "2026-04-30",
    readingMinutes: 8,
  },
  {
    slug: "cat-toxic-foods",
    title: "貓咪應避免的 15 種危險食物",
    description:
      "洋蔥、巧克力、百合、木糖醇等家中常見危險食物與植物，整理誤食後的觀察重點與就醫時機。",
    category: "food",
    keywords: ["貓不能吃", "貓中毒", "貓食物禁忌", "貓百合中毒", "貓洋蔥中毒"],
    publishedAt: "2026-04-06",
    updatedAt: "2026-04-30",
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
      "幼犬咬人常和換牙、探索與興奮有關。整理 4 週訓練步驟：建立痛感、替代行為、暫停法與冷靜練習。",
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
    updatedAt: "2026-04-30",
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
    updatedAt: "2026-04-30",
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
    updatedAt: "2026-04-30",
    readingMinutes: 7,
  },
  {
    slug: "dog-water-intake",
    title: "狗狗每天該喝多少水？缺水警訊與 8 個補水技巧",
    description:
      "用體重粗估每日飲水量，建立自家狗狗基準值，並整理脫水、多喝多尿與夏季補水的觀察重點。",
    category: "food",
    keywords: ["狗喝水", "狗狗脫水", "狗狗飲水量", "狗中暑", "多喝多尿"],
    publishedAt: "2026-04-06",
    updatedAt: "2026-04-30",
    readingMinutes: 6,
  },
  {
    slug: "cat-hair-loss",
    title: "貓咪掉毛是正常還是生病？7 個可能原因",
    description: "正常換毛、局部禿斑、過度理毛如何分辨？整理 7 個常見原因、居家觀察與就醫時機。",
    category: "health",
    keywords: ["貓掉毛", "貓禿斑", "貓咪皮膚病", "貓癬", "貓換毛"],
    publishedAt: "2026-04-06",
    updatedAt: "2026-04-30",
    readingMinutes: 6,
  },
  {
    slug: "dog-neuter-guide",
    title: "狗狗結紮完整指南：利弊、時機、術後照護",
    description: "該不該結紮？什麼時候結紮？公犬 4-8 千、母犬 6-12 千，獸醫建議時機與術後 7 天照護重點。",
    category: "health",
    keywords: ["狗狗結紮", "狗絕育", "結紮時機", "絕育好處", "術後照護"],
    publishedAt: "2026-04-06",
    updatedAt: "2026-04-30",
    readingMinutes: 6,
  },
  {
    slug: "dog-poop-health",
    title: "從狗狗便便看健康：顏色、形狀、氣味解析",
    description: "用顏色、形狀、黏液、異物與排便頻率判斷狗狗腸胃狀態，整理需要立即就醫的便便警訊與觀察紀錄。",
    category: "health",
    keywords: ["狗便便", "狗狗血便", "狗便便顏色", "狗腹瀉", "狗便秘"],
    publishedAt: "2026-04-06",
    updatedAt: "2026-04-30",
    readingMinutes: 6,
  },
  {
    slug: "cat-meow-meanings",
    title: "貓咪叫聲的 10 種含意，學會跟貓咪對話",
    description: "短促喵、拉長喵、咕嚕咕嚕、嘶聲與哭叫代表什麼？整理 10 種貓叫情境，判斷需求、壓力與就醫警訊。",
    category: "behavior",
    keywords: ["貓叫聲", "貓叫含意", "貓咪溝通", "貓語言", "貓行為"],
    publishedAt: "2026-04-06",
    readingMinutes: 5,
  },
  {
    slug: "dog-separation-anxiety",
    title: "狗狗分離焦慮完整解析：5 個徵兆與漸進訓練",
    description: "你出門牠就崩潰嗎？整理分離焦慮 5 個徵兆、3 階段減敏訓練與居家調整方法，幫狗狗練習安心獨處。",
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
    updatedAt: "2026-04-30",
    readingMinutes: 6,
  },
  {
    slug: "senior-cat-diet",
    title: "老貓飲食調整完整攻略：10 歲以上必看",
    description: "老貓飲食要看體重、肌肉、牙齒、腎臟與甲狀腺狀態。整理水分、蛋白質、處方飲食與食慾下降的處理界線。",
    category: "food",
    keywords: ["老貓飲食", "老貓腎病", "高齡貓", "貓處方飼料", "老貓照護"],
    publishedAt: "2026-04-06",
    updatedAt: "2026-04-30",
    readingMinutes: 6,
  },
  {
    slug: "dog-heatstroke-prevention",
    title: "狗狗中暑預防與急救完整指南",
    description: "整理狗狗中暑高風險族群、早期徵兆、降溫急救步驟、送醫時機與夏天散步安全原則，避免熱傷害惡化。",
    category: "health",
    keywords: ["狗狗中暑", "狗熱衰竭", "夏天養狗", "中暑急救", "短吻犬中暑"],
    publishedAt: "2026-04-06",
    updatedAt: "2026-04-30",
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
    title: "寵物牙齒保健完整指南：刷牙、洗牙與口腔警訊",
    description: "整理狗貓牙菌斑、牙結石、牙齦炎與牙周病的差異，說明居家刷牙、專業洗牙與不麻醉洗牙風險。",
    category: "grooming",
    keywords: ["寵物牙齒", "狗刷牙", "貓洗牙", "寵物牙周病", "寵物口臭"],
    publishedAt: "2026-04-06",
    updatedAt: "2026-04-30",
    readingMinutes: 7,
  },
  { slug: "dog-grass-eating", title: "狗狗為什麼一直吃草？5 個原因解析", description: "偶爾吃草多半是一般行為，但頻繁嘔吐、血便或噴藥草地就要小心。整理原因、觀察方式與就醫界線。", category: "behavior", keywords: ["狗吃草", "狗狗吃草原因", "狗嘔吐"], publishedAt: "2026-04-06", updatedAt: "2026-04-30", readingMinutes: 6 },
  { slug: "cat-purring-meaning", title: "貓咪咕嚕聲的 4 種含意：不只是開心", description: "貓咪咕嚕可能是放鬆、討食、緊張或疼痛時的自我安撫。用情境與身體訊號一起判斷。", category: "behavior", keywords: ["貓咕嚕", "貓呼嚕", "貓聲音"], publishedAt: "2026-04-06", updatedAt: "2026-04-30", readingMinutes: 6 },
  { slug: "pet-insurance-guide", title: "寵物保險值得買嗎？台灣方案完整比較", description: "從等待期、自負額、理賠上限、既往症與醫療基金角度，判斷寵物保險是否適合你家毛孩。", category: "beginner", keywords: ["寵物保險", "狗保險", "貓保險"], publishedAt: "2026-04-06", updatedAt: "2026-04-30", readingMinutes: 6 },
  { slug: "dog-homemade-food", title: "狗狗鮮食入門：3 道簡單食譜與注意事項", description: "鮮食可以加菜，但長期主食需要營養平衡。整理 3 道入門加菜、禁忌食材與食安重點。", category: "food", keywords: ["狗鮮食", "狗食譜", "自製飼料"], publishedAt: "2026-04-06", updatedAt: "2026-04-30", readingMinutes: 6 },
  { slug: "pet-travel-guide", title: "帶毛孩旅行攻略：交通、住宿與行前清單", description: "從健康評估、交通官方規則、住宿確認到回家後觀察，整理狗貓旅行前後的安全清單。", category: "beginner", keywords: ["帶狗旅行", "寵物旅行", "寵物友善"], publishedAt: "2026-04-06", updatedAt: "2026-04-30", readingMinutes: 6 },
  { slug: "cat-indoor-enrichment", title: "室內貓環境豐富化：5 大原則", description: "整理室內貓需要的安全休息點、分散資源、狩獵式玩耍、垂直空間與穩定互動，改善無聊與壓力行為。", category: "behavior", keywords: ["室內貓", "貓環境", "貓玩具"], publishedAt: "2026-04-06", updatedAt: "2026-04-30", readingMinutes: 6 },
  { slug: "dog-ear-care", title: "狗狗耳朵清潔完整指南", description: "耳朵不是越洗越好。學會分辨健康耳朵、正確清潔步驟、過度清潔風險與就醫警訊。", category: "grooming", keywords: ["狗耳朵清潔", "狗耳朵臭", "狗中耳炎"], publishedAt: "2026-04-06", updatedAt: "2026-04-30", readingMinutes: 6 },
  { slug: "cat-carrier-training", title: "貓咪外出籠訓練：7 天減壓法", description: "整理 7 天貓咪外出籠練習、就醫當天減壓技巧與緊急放籠方式，讓外出籠變成安全空間。", category: "behavior", keywords: ["貓外出籠", "貓看醫生", "貓訓練"], publishedAt: "2026-04-06", updatedAt: "2026-04-30", readingMinutes: 6 },
  { slug: "dog-leash-training", title: "牽繩散步訓練：3 週告別暴衝", description: "用正向訓練建立鬆繩散步規則，整理 3 週練習步驟，處理電梯、騎樓、遇到狗等常見情境。", category: "behavior", keywords: ["狗拉繩", "狗暴衝", "鬆繩散步"], publishedAt: "2026-04-06", updatedAt: "2026-04-30", readingMinutes: 6 },
  { slug: "pet-summer-care", title: "寵物夏季照護 8 大重點", description: "台灣夏季高溫高濕，整理散步時段、車內安全、飲水、防蟲、皮膚悶熱與中暑急救重點。", category: "health", keywords: ["寵物夏天", "狗防曬", "寵物中暑"], publishedAt: "2026-04-06", updatedAt: "2026-04-30", readingMinutes: 6 },
  { slug: "cat-sneezing-causes", title: "貓咪一直打噴嚏？6 個原因", description: "從粉塵刺激、上呼吸道感染、過敏到牙齒與鼻腔問題，判斷貓打噴嚏何時需要就醫。", category: "health", keywords: ["貓打噴嚏", "貓感冒", "貓鼻水"], publishedAt: "2026-04-06", updatedAt: "2026-04-30", readingMinutes: 6 },
  { slug: "dog-socialization", title: "狗狗社會化完整指南：黃金期 3-14 週", description: "整理狗狗社會化黃金期、身體訊號、安全距離與每日短練習，避免把幼犬硬丟進人群造成壓力。", category: "behavior", keywords: ["狗社會化", "幼犬社會化", "狗害怕"], publishedAt: "2026-04-06", updatedAt: "2026-04-30", readingMinutes: 6 },
  { slug: "pet-adoption-guide", title: "領養毛孩指南：評估、流程與新手準備", description: "領養前先評估時間、預算、家庭共識與生活型態，再選擇適合的收容所、中途或成年動物。", category: "beginner", keywords: ["領養", "認養", "收容所"], publishedAt: "2026-04-06", updatedAt: "2026-04-30", readingMinutes: 6 },
  { slug: "dog-food-brand-comparison", title: "狗飼料怎麼選？成分表、營養聲明與換食重點", description: "從完整均衡、生命階段、熱量標示、製造資訊與換食方式，判斷狗飼料是否適合長期當主食。", category: "food", keywords: ["狗飼料推薦", "飼料比較", "狗飼料品牌", "飼料成分"], publishedAt: "2026-04-06", updatedAt: "2026-04-30", readingMinutes: 8 },
  { slug: "how-to-choose-vet", title: "怎麼選獸醫院？8 個評估標準完整指南", description: "從距離、設備、溝通方式、收費透明度、急診轉介與病歷追蹤，判斷哪間動物醫院適合長期合作。", category: "health", keywords: ["獸醫推薦", "獸醫院怎麼選", "動物醫院", "看診費用"], publishedAt: "2026-04-06", updatedAt: "2026-04-30", readingMinutes: 7 },
  { slug: "cat-tree-buying-guide", title: "貓跳台選購完整指南：6 大標準不踩雷", description: "整理貓跳台高度、穩定性、材質、動線、抓板與清潔維護檢查清單，挑選適合室內貓的安全家具。", category: "grooming", keywords: ["貓跳台推薦", "貓跳台選購", "貓傢俱", "貓塔"], publishedAt: "2026-04-06", updatedAt: "2026-04-30", readingMinutes: 6 },
  {
    slug: "cat-food-guide",
    title: "貓飼料怎麼選？乾糧、濕食、生食完整比較指南",
    description: "從貓的營養需求、乾糧濕食差異、生食風險、成分表判讀與生命階段，整理貓主食選擇重點。",
    category: "food",
    keywords: ["貓飼料推薦", "貓咪飲食", "貓乾糧濕食", "貓飼料成分", "貓生食"],
    publishedAt: "2026-04-13",
    updatedAt: "2026-04-30",
    readingMinutes: 9,
  },
  {
    slug: "dog-spring-shedding",
    title: "春天換季狗狗大量掉毛怎麼辦？完整梳毛指南與工具推薦",
    description: "春天換毛季來了！為什麼毛掉這麼多？哪些是異常訊號？正確梳毛工具、6 步驟梳毛法、魚油補充重點，一篇搞定換毛期照護。",
    category: "grooming",
    keywords: ["狗掉毛", "換毛期", "狗春天掉毛", "梳毛工具", "脫毛刷"],
    publishedAt: "2026-04-13",
    updatedAt: "2026-04-30",
    readingMinutes: 8,
  },
  {
    slug: "multi-cat-household",
    title: "多貓家庭完整指南：迎接第二隻貓的 8 個關鍵步驟",
    description: "貓咪是領土性動物，貿然引進新成員容易引發衝突。從隔離期、氣味交換、到正式見面，8 個步驟讓兩隻貓和平共處。",
    category: "beginner",
    keywords: ["多貓家庭", "第二隻貓", "養兩隻貓", "貓咪引入", "貓貓共處"],
    publishedAt: "2026-04-13",
    readingMinutes: 8,
  },
  {
    slug: "dog-skin-allergy",
    title: "狗狗皮膚過敏完整指南：常見原因、症狀辨別與改善方法",
    description: "狗狗不停抓癢、皮膚發紅、反覆耳朵發炎？可能是過敏！食物過敏 vs 環境過敏的差異、診斷流程、居家管理方法一次說清楚。",
    category: "health",
    keywords: ["狗皮膚過敏", "狗過敏症狀", "犬異位性皮膚炎", "狗食物過敏", "狗搔癢"],
    publishedAt: "2026-04-13",
    updatedAt: "2026-04-30",
    readingMinutes: 9,
  },
  {
    slug: "kitten-first-year",
    title: "幼貓第一年完整照護指南：從接回家到滿週歲",
    description: "幼貓的第一年決定一生健康！疫苗時程、驅蟲、換牙、社會化、絕育時機、飲食轉換——按月齡排列的完整指南，新手飼主必讀。",
    category: "beginner",
    keywords: ["幼貓照顧", "小貓怎麼養", "幼貓飼養", "新手養貓", "幼貓疫苗", "幼貓飼料"],
    publishedAt: "2026-04-20",
    readingMinutes: 10,
  },
  {
    slug: "cat-vaccination-guide",
    title: "貓咪疫苗完整指南：時程、費用與注意事項",
    description: "三合一、狂犬病、FeLV⋯⋯哪些是必打？費用多少？室內貓也需要嗎？台灣貓咪疫苗完整解析,含施打時程表與副作用觀察重點。",
    category: "health",
    keywords: ["貓咪疫苗", "貓疫苗時程", "三合一疫苗", "狂犬病疫苗", "幼貓疫苗費用"],
    publishedAt: "2026-04-20",
    updatedAt: "2026-04-30",
    readingMinutes: 9,
  },
  {
    slug: "cat-safe-fruits",
    title: "貓咪可以吃什麼水果？可少量嘗試與應避免清單",
    description: "貓咪不是很需要水果。整理蘋果、藍莓、西瓜等可少量嘗試水果，以及葡萄、酪梨、果核等應避免項目。",
    category: "food",
    keywords: ["貓可以吃的水果", "貓水果", "貓葡萄中毒", "貓可以吃西瓜嗎", "貓零食"],
    publishedAt: "2026-04-27",
    updatedAt: "2026-04-30",
    readingMinutes: 8,
  },
  {
    slug: "dog-boarding-holiday-guide",
    title: "過年狗狗寄宿指南：寵物旅館、寄宿家庭與行前清單",
    description: "過年返鄉或連假外出時，整理狗狗寄宿旅館、寄宿家庭、疫苗文件、行李清單與回家後觀察重點。",
    category: "beginner",
    keywords: ["狗狗寄宿", "寵物旅館", "寄宿家庭", "過年寵物安置", "帶狗旅行"],
    publishedAt: "2026-05-09",
    readingMinutes: 6,
  },
  {
    slug: "dog-anal-glands",
    title: "狗狗肛門腺完整指南:擠壓時機、居家步驟與發炎警訊",
    description: "狗狗磨屁股、聞到魚腥味就是肛門腺在抗議!學會 5 個異常徵兆、7 步驟居家擠壓法、預防發炎與破裂的 4 招日常照護,讓毛孩屁屁不再痛痛。",
    category: "grooming",
    keywords: ["狗肛門腺", "狗磨屁股", "狗肛門腺發炎", "肛門腺擠壓", "狗肛門腺破裂"],
    publishedAt: "2026-04-27",
    updatedAt: "2026-04-30",
    readingMinutes: 9,
  },
  {
    slug: "rainy-season-pet-care",
    title: "梅雨季寵物照護指南：潮濕季節的皮膚、耳朵與環境管理",
    description:
      "梅雨季濕度飆破 85%，是狗貓皮膚病、黴菌與耳朵感染的高發期。整理淋雨後處理、徹底吹乾、垂耳犬耳道照護、居家除濕與飼料防潮重點。",
    category: "grooming",
    keywords: ["梅雨季寵物", "潮濕季節皮膚", "狗黴菌", "寵物除濕", "狗耳朵感染", "毛孩防潮"],
    publishedAt: "2026-06-01",
    readingMinutes: 7,
  },
  {
    slug: "cat-water-intake",
    title: "貓咪不愛喝水怎麼辦？8 個增加飲水量的方法",
    description:
      "貓咪天生不愛喝水，純吃乾飼料最容易缺水，增加泌尿道與腎病風險。整理每日飲水量估算、缺水警訊與 8 個有效的增加飲水技巧。",
    category: "food",
    keywords: ["貓不愛喝水", "貓咪飲水量", "貓咪喝水", "貓泌尿道", "貓補水", "貓飲水器"],
    publishedAt: "2026-06-01",
    readingMinutes: 7,
  },
  {
    slug: "dog-safe-vegetables",
    title: "狗狗可以吃什麼蔬菜？安全與危險蔬菜完整清單",
    description:
      "紅蘿蔔、地瓜、南瓜可以吃；洋蔥、蔥蒜、酪梨千萬別碰。整理台灣常見蔬菜的狗狗食用指南、烹調原則與誤食處理。",
    category: "food",
    keywords: ["狗可以吃的蔬菜", "狗狗蔬菜", "狗洋蔥中毒", "狗可以吃紅蘿蔔嗎", "狗加菜"],
    publishedAt: "2026-06-29",
    readingMinutes: 7,
  },
  {
    slug: "cat-summer-shaving",
    title: "貓咪夏天需要剃毛嗎？破解迷思與正確消暑方法",
    description:
      "夏天幫貓剃毛其實弊大於利！被毛是防曬與隔熱屏障，剃掉反而易曬傷。整理剃毛風險、真正需要剃的情況與不剃毛的安全消暑法。",
    category: "grooming",
    keywords: ["貓剃毛", "貓夏天剃毛", "貓咪消暑", "貓剃毛風險", "貓咪散熱", "貓中暑"],
    publishedAt: "2026-06-29",
    readingMinutes: 7,
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
