import { ogCard, ogSize } from "@/lib/og";

export const alt = "ALRO — Digital Craft & Intelligence";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogCard({
    kicker: "Digital craft & intelligence",
    title: "Digital experiences with feeling. Intelligent systems with purpose.",
  });
}
