import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ScreenshotOverlayProps {
  children: ReactNode;
  headline: string;
  subtitle: string;
  deviceType?: "iphone-67" | "iphone-65" | "ipad-129" | "android-phone" | "android-tablet";
  showFreeBadge?: boolean;
}

const DEVICE_DIMENSIONS = {
  "iphone-67": { width: 1290, height: 2796 },
  "iphone-65": { width: 1242, height: 2688 },
  "ipad-129": { width: 2048, height: 2732 },
  "android-phone": { width: 1080, height: 2400 },
  "android-tablet": { width: 1600, height: 2560 },
};

export function ScreenshotOverlay({
  children,
  headline,
  subtitle,
  deviceType = "iphone-67",
  showFreeBadge = true,
}: ScreenshotOverlayProps) {
  const dimensions = DEVICE_DIMENSIONS[deviceType];

  return (
    <div
      className="relative bg-background overflow-hidden"
      style={{ width: dimensions.width, height: dimensions.height }}
    >
      {/* Main content */}
      <div className="absolute inset-0">{children}</div>

      {/* Marketing overlay at top */}
      <div className="absolute top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/90 via-black/70 to-transparent pt-16 pb-32">
        {showFreeBadge && (
          <div className="flex justify-center mb-8">
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-3 rounded-full text-2xl font-bold shadow-lg">
              100% FREE FOREVER
            </div>
          </div>
        )}
        
        <h1 className="text-center text-white font-bold px-12 mb-4" style={{ fontSize: deviceType.includes("ipad") ? "4.5rem" : "3.5rem", lineHeight: 1.1 }}>
          {headline}
        </h1>
        
        <p className="text-center text-white/90 px-16" style={{ fontSize: deviceType.includes("ipad") ? "2rem" : "1.5rem" }}>
          {subtitle}
        </p>
      </div>

      {/* Bottom gradient for polish */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/50 to-transparent z-40" />
    </div>
  );
}
