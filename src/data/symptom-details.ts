

// ============ 追問選項 ============

export interface FollowUpOption {
  id: string;
  label: string;
  urgencyDelta: number; // 加到基礎緊急度上
  causes: string[];
  advice: string[];
}

export interface FollowUpQuestion {
  id: string;
  label: string;
  description?: string;
  options: FollowUpOption[];
}

// 嘔吐追問
export const VOMIT_FOLLOWUPS: FollowUpQuestion[] = [
  {
    id: "vomit_color",
    label: "嘔吐物顏色？",
    options: [
      {
        id: "clear_white",
        label: "透明 / 白色泡沫",
        urgencyDelta: 0,
        causes: ["空腹太久", "胃酸分泌過多", "輕微胃炎"],
        advice: ["少量多餐", "避免空腹超過 12 小時"],
      },
      {
        id: "yellow_green",
        label: "黃色 / 綠色（膽汁）",
        urgencyDelta: 1,
        causes: ["空腹嘔吐（膽汁逆流）", "腸道阻塞初期", "胰臟炎"],
        advice: ["若空腹引起可睡前給少量食物", "持續 2 天以上請就醫"],
      },
      {
        id: "food_undigested",
        label: "未消化的食物",
        urgencyDelta: 0,
        causes: ["吃太快", "食物過敏", "胃蠕動異常"],
        advice: ["使用慢食碗", "觀察是否特定食物引起"],
      },
      {
        id: "brown_smelly",
        label: "深褐色 / 糞便味",
        urgencyDelta: 3,
        causes: ["腸道阻塞（嚴重）", "嚴重便秘逆流"],
        advice: ["⚠️ 立即就醫", "可能需要 X 光或手術"],
      },
      {
        id: "red_blood",
        label: "鮮紅色（帶血）",
        urgencyDelta: 4,
        causes: ["胃潰瘍", "食道撕裂", "中毒", "凝血異常"],
        advice: ["🚨 立即送急診", "記錄嘔吐頻率和量"],
      },
      {
        id: "coffee_ground",
        label: "咖啡色渣狀",
        urgencyDelta: 4,
        causes: ["上消化道出血（已消化的血）", "胃潰瘍出血"],
        advice: ["🚨 立即送急診", "這是消化過的血液"],
      },
    ],
  },
  {
    id: "vomit_content",
    label: "嘔吐物中有什麼？",
    options: [
      {
        id: "hair",
        label: "毛球 / 毛髮",
        urgencyDelta: -1,
        causes: ["毛球症（貓咪常見）", "過度理毛"],
        advice: ["增加梳毛頻率", "餵化毛膏或高纖飼料", "每月 1-2 次屬正常"],
      },
      {
        id: "foreign_object",
        label: "異物（繩子、塑膠、布）",
        urgencyDelta: 3,
        causes: ["誤食異物", "可能部分還在腸道中"],
        advice: ["⚠️ 立即就醫", "帶著嘔吐物中的異物給醫生看", "可能需要 X 光"],
      },
      {
        id: "worms",
        label: "蟲體（白色線狀或米粒狀）",
        urgencyDelta: 1,
        causes: ["蛔蟲感染", "絛蟲感染"],
        advice: ["帶糞便樣本就醫", "需口服驅蟲藥"],
      },
      {
        id: "grass",
        label: "草",
        urgencyDelta: -1,
        causes: ["本能行為", "胃部不適想催吐"],
        advice: ["偶爾吃草嘔吐是正常的", "頻繁則需就醫"],
      },
      {
        id: "liquid_only",
        label: "只有液體 / 沒有固體",
        urgencyDelta: 0,
        causes: ["胃酸過多", "腸胃炎初期"],
        advice: ["觀察 24 小時", "少量給水避免脫水"],
      },
    ],
  },
  {
    id: "vomit_frequency",
    label: "嘔吐頻率？",
    options: [
      {
        id: "once",
        label: "只吐一次",
        urgencyDelta: -1,
        causes: ["偶發性消化不適"],
        advice: ["觀察即可", "如果精神食慾正常不需擔心"],
      },
      {
        id: "few_times",
        label: "今天吐 2-3 次",
        urgencyDelta: 1,
        causes: ["腸胃炎", "食物不耐"],
        advice: ["禁食 6-12 小時", "少量給水", "24 小時未改善就醫"],
      },
      {
        id: "many_today",
        label: "今天吐 4 次以上",
        urgencyDelta: 3,
        causes: ["嚴重腸胃炎", "中毒", "腸道阻塞"],
        advice: ["⚠️ 建議立即就醫", "脫水風險高"],
      },
      {
        id: "days",
        label: "持續好幾天每天都吐",
        urgencyDelta: 3,
        causes: ["慢性腎病", "肝病", "慢性胰臟炎", "腫瘤"],
        advice: ["⚠️ 儘速安排血檢", "可能是慢性疾病"],
      },
    ],
  },
];

// 排便追問
export const STOOL_FOLLOWUPS: FollowUpQuestion[] = [
  {
    id: "stool_color",
    label: "便便顏色？",
    options: [
      {
        id: "normal_brown",
        label: "正常巧克力棕",
        urgencyDelta: -1,
        causes: ["顏色正常"],
        advice: ["顏色沒問題，注意其他症狀"],
      },
      {
        id: "black_tar",
        label: "黑色（柏油狀）",
        urgencyDelta: 4,
        causes: ["上消化道出血（胃、小腸）"],
        advice: ["🚨 立即就醫", "黑色代表消化過的血液"],
      },
      {
        id: "red_blood",
        label: "鮮紅色血絲 / 血便",
        urgencyDelta: 3,
        causes: ["大腸出血", "肛裂", "嚴重結腸炎", "犬小病毒（幼犬）"],
        advice: ["⚠️ 24 小時內就醫", "帶糞便樣本"],
      },
      {
        id: "yellow_orange",
        label: "黃色 / 橘色",
        urgencyDelta: 1,
        causes: ["肝膽問題", "胰臟分泌不足", "吃了紅蘿蔔/南瓜"],
        advice: ["排除飲食因素後就醫", "可能需要血檢"],
      },
      {
        id: "grey_white",
        label: "灰白色",
        urgencyDelta: 3,
        causes: ["膽道阻塞", "胰臟疾病", "肝臟疾病"],
        advice: ["⚠️ 需就醫做血檢與影像"],
      },
      {
        id: "green",
        label: "綠色",
        urgencyDelta: 0,
        causes: ["吃太多草", "腸道蠕動過快", "膽汁異常"],
        advice: ["偶爾一次可觀察", "持續則需就醫"],
      },
    ],
  },
  {
    id: "stool_shape",
    label: "便便形狀？",
    options: [
      {
        id: "normal_formed",
        label: "成形條狀（正常）",
        urgencyDelta: -1,
        causes: ["形狀正常"],
        advice: ["形狀沒問題"],
      },
      {
        id: "soft_mushy",
        label: "軟便 / 糊狀",
        urgencyDelta: 0,
        causes: ["換食物", "輕微消化不良", "壓力"],
        advice: ["觀察 1-2 天", "提供清淡飲食"],
      },
      {
        id: "watery",
        label: "水狀腹瀉",
        urgencyDelta: 2,
        causes: ["腸胃炎", "寄生蟲", "食物中毒", "病毒感染"],
        advice: ["24 小時內未改善就醫", "注意補水防脫水"],
      },
      {
        id: "hard_dry",
        label: "乾硬顆粒狀",
        urgencyDelta: 1,
        causes: ["飲水不足", "纖維不足", "腸道蠕動慢"],
        advice: ["增加飲水量", "增加纖維攝取", "48 小時無改善就醫"],
      },
      {
        id: "mucus",
        label: "帶黏液 / 果凍狀",
        urgencyDelta: 2,
        causes: ["結腸炎", "寄生蟲", "腸道發炎"],
        advice: ["帶糞便樣本就醫", "做寄生蟲檢查"],
      },
    ],
  },
  {
    id: "stool_frequency",
    label: "排便頻率？",
    options: [
      {
        id: "more_frequent",
        label: "比平時多很多次",
        urgencyDelta: 1,
        causes: ["腸道發炎", "腸躁症", "壓力"],
        advice: ["記錄次數", "持續 2 天就醫"],
      },
      {
        id: "no_stool",
        label: "已經 2 天以上沒排便",
        urgencyDelta: 2,
        causes: ["便秘", "腸道阻塞", "巨結腸症"],
        advice: ["⚠️ 超過 48 小時請就醫", "不要自行灌腸"],
      },
      {
        id: "straining",
        label: "一直蹲但拉不出來 / 很用力",
        urgencyDelta: 2,
        causes: ["便秘", "前列腺腫大（公犬）", "膀胱問題（可能搞混排尿）"],
        advice: ["注意是拉不出便便還是尿不出來", "公貓尿不出來是急診！"],
      },
    ],
  },
];

// 飲水異常追問
export const DRINKING_FOLLOWUPS: FollowUpQuestion[] = [
  {
    id: "drinking_change",
    label: "飲水量怎麼變化？",
    options: [
      {
        id: "much_more",
        label: "明顯喝很多（每天補好幾次水）",
        urgencyDelta: 2,
        causes: ["慢性腎病", "糖尿病", "庫欣氏症", "子宮蓄膿（母犬）"],
        advice: ["⚠️ 需要血檢與尿檢", "記錄每天喝水量"],
      },
      {
        id: "slightly_more",
        label: "比平時稍微多一點",
        urgencyDelta: 0,
        causes: ["天氣熱", "運動後", "換食物（乾糧為主）"],
        advice: ["可能是正常反應", "持續觀察 1 週"],
      },
      {
        id: "less",
        label: "喝水變少 / 不喝水",
        urgencyDelta: 2,
        causes: ["噁心", "口腔疼痛", "發燒"],
        advice: ["⚠️ 24 小時不喝水請就醫", "脫水風險高"],
      },
    ],
  },
];

// 搔癢追問
export const SCRATCHING_FOLLOWUPS: FollowUpQuestion[] = [
  {
    id: "scratch_location",
    label: "主要搔癢部位？",
    options: [
      {
        id: "ears",
        label: "耳朵（甩頭、搔耳）",
        urgencyDelta: 1,
        causes: ["耳疥蟲", "酵母菌感染", "細菌性外耳炎"],
        advice: ["檢查耳內有無黑褐色分泌物", "不要用棉花棒深入"],
      },
      {
        id: "belly_paws",
        label: "肚子、腋下、腳掌（舔咬）",
        urgencyDelta: 1,
        causes: ["異位性皮膚炎（過敏）", "接觸性過敏", "食物過敏"],
        advice: ["記錄是否季節性發作", "可能需要排除飲食試驗"],
      },
      {
        id: "back_tail",
        label: "背部、尾巴根部",
        urgencyDelta: 1,
        causes: ["跳蚤過敏（最典型位置）", "跳蚤叮咬"],
        advice: ["翻開毛髮找黑色跳蚤糞便", "每月預防滴劑"],
      },
      {
        id: "bald_patches",
        label: "有局部禿斑",
        urgencyDelta: 2,
        causes: ["黴菌感染（貓癬，會傳人）", "蠕形蟎蟲", "壓力性過度理毛"],
        advice: ["⚠️ 需就醫做皮膚刮片", "懷疑貓癬要隔離"],
      },
      {
        id: "whole_body",
        label: "全身到處癢",
        urgencyDelta: 2,
        causes: ["嚴重跳蚤感染", "全身性過敏", "內分泌疾病"],
        advice: ["檢查驅蟲是否按時", "需就醫做詳細檢查"],
      },
    ],
  },
];

// 呼吸異常追問
export const BREATHING_FOLLOWUPS: FollowUpQuestion[] = [
  {
    id: "breathing_type",
    label: "呼吸異常的表現？",
    options: [
      {
        id: "panting_fast",
        label: "喘氣急促（嘴巴張開、舌頭伸出）",
        urgencyDelta: 2,
        causes: ["中暑", "疼痛", "焦慮", "心臟病"],
        advice: ["先移到涼爽處", "非運動後持續喘→就醫"],
      },
      {
        id: "coughing",
        label: "咳嗽（乾咳或濕咳）",
        urgencyDelta: 1,
        causes: ["犬舍咳", "氣管塌陷", "心臟病", "肺炎"],
        advice: ["記錄咳嗽時間點（晚上？運動後？）"],
      },
      {
        id: "wheezing",
        label: "呼吸有雜音 / 喘鳴",
        urgencyDelta: 2,
        causes: ["氣管狹窄", "異物卡喉", "哮喘（貓）"],
        advice: ["⚠️ 建議就醫", "貓咪哮喘需長期管理"],
      },
      {
        id: "open_mouth_cat",
        label: "貓咪張嘴呼吸",
        urgencyDelta: 4,
        causes: ["嚴重呼吸困難", "心臟病", "胸腔積液", "哮喘急性發作"],
        advice: ["🚨 貓咪張嘴呼吸是急診！立即送醫"],
      },
      {
        id: "blue_gums",
        label: "舌頭或牙齦發紫",
        urgencyDelta: 5,
        causes: ["嚴重缺氧", "心臟衰竭", "呼吸道完全阻塞"],
        advice: ["🚨 生命危險！立即急診"],
      },
    ],
  },
];

// 主症狀到追問的映射
export const SYMPTOM_FOLLOWUP_MAP: Record<string, FollowUpQuestion[]> = {
  vomiting: VOMIT_FOLLOWUPS,
  diarrhea: STOOL_FOLLOWUPS,
  bloody_stool: STOOL_FOLLOWUPS,
  drinking_more: DRINKING_FOLLOWUPS,
  scratching: SCRATCHING_FOLLOWUPS,
  breath_hard: BREATHING_FOLLOWUPS,
};
