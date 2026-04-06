import type { Metadata } from "next";
import { Card } from "@/components/ui/Card";
import { VaccineReminder } from "@/components/tools/VaccineReminder";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildPageMetadata, webApplicationSchema } from "@/lib/seo";

const PAGE_PATH = "/tools/vaccine-reminder";

export const metadata: Metadata = buildPageMetadata({
  title: "疫苗提醒 — 輸入出生日期自動算出每次疫苗時間",
  description:
    "輸入狗狗或貓咪的出生日期，自動計算每次疫苗預防針的施打日期。包含五合一、八合一、三合一、狂犬病完整時程。",
  keywords: ["疫苗提醒", "狗疫苗時間", "貓疫苗日期", "預防針時間", "幼犬疫苗"],
  path: PAGE_PATH,
});

export default function VaccineReminderPage() {
  return (
    <>
      <JsonLd
        data={webApplicationSchema({
          name: "疫苗提醒",
          description: "輸入出生日期自動算出每次疫苗時間",
          path: PAGE_PATH,
        })}
      />
      <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 text-3xl mb-4">
            🔔
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-ink-900 mb-3">
            疫苗提醒
          </h1>
          <p className="text-ink-500">
            輸入出生日期，自動算出每次疫苗施打時間
          </p>
        </div>

        <Card padding="lg">
          <VaccineReminder />
        </Card>
      </div>
    </>
  );
}
