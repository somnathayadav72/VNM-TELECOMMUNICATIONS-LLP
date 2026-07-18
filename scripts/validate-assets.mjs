import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const required = [
  "public/brand/vnm-telecommunications-mark.svg",
  "public/brand/vnm-telecommunications-mark.png",
  "public/brand/vnm-telecommunications-mark-on-dark.svg",
  "public/brand/vnm-telecommunications-wordmark.svg",
  "public/brand/vnm-telecommunications-lockup-dark.svg",
  "public/brand/vnm-telecommunications-lockup-light.svg",
  "public/brand/vnm-telecommunications-social-avatar.svg",
  "public/opengraph-image.png",
  "src/app/apple-icon.png",
  "src/app/icon.svg",
  "public/textures/noise.svg",
  "public/textures/device-grid.svg",
  "public/textures/precision-lines.svg",
  "public/textures/pulse-rings.svg",
  "public/textures/packing-grid.svg",
  "public/textures/scan-lines.svg",
  "public/textures/grading-marks.svg",
  "public/textures/route-map.svg",
  "public/textures/serial-pattern.svg",
  "public/maps/india-states.svg",
];
const deviceNames = ["hero-device-stack", "smartphone-stack", "tablet-laptop-set", "wearables-set", "accessory-kit", "nova-x1", "slate-pro", "pulse-set", "charge-grid", "grade-new", "grade-a-plus", "grade-a", "grade-b", "grade-c", "quality-inspection", "packed-shipment", "warehouse-device-wall"];

for (const name of deviceNames) {
  required.push(`public/generated/devices/${name}.svg`, `public/images/devices/${name}.webp`);
}

const missing = required.filter((entry) => {
  const target = path.join(root, entry);
  return !fs.existsSync(target) || fs.statSync(target).size === 0;
});

if (missing.length) {
  console.error("Missing or empty assets:\n" + missing.map((item) => `- ${item}`).join("\n"));
  process.exit(1);
}

const sourceFiles = ["src/data/categories.js", "src/data/grades.js", "src/data/devices.js", "src/data/assets.js"];
const sourceText = sourceFiles.map((file) => fs.readFileSync(path.join(root, file), "utf8")).join("\n");
for (const reference of ["/generated/devices/", "/images/devices/", "/textures/"]) {
  if (!sourceText.includes(reference)) console.warn(`Asset reference family not found in data: ${reference}`);
}

console.log(`Asset validation passed: ${required.length} required assets present.`);
