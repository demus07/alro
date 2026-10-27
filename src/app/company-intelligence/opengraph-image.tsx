import { ogCard, ogSize } from "@/lib/og";

export const alt = "Company Intelligence by ALRO";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogCard({
    kicker: "Company Intelligence · Working prototype",
    title: "Find what your company knows. Surface what needs attention. Move work forward.",
  });
}
