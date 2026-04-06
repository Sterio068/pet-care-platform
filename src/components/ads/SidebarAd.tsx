import { AdBanner } from "./AdBanner";

export function SidebarAd() {
  return (
    <div className="hidden lg:block">
      <div className="sticky top-20">
        <AdBanner slot="sidebar" format="vertical" />
      </div>
    </div>
  );
}
