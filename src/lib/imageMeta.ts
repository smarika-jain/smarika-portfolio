import fs from "node:fs";
import path from "node:path";

const PUBLIC_DIR = path.join(process.cwd(), "public");

function toFilePath(publicPath: string): string {
  return path.join(PUBLIC_DIR, publicPath.replace(/^\/+/, ""));
}

/** True if a file exists at the given /public-relative path. */
export function publicFileExists(publicPath: string): boolean {
  return fs.existsSync(toFilePath(publicPath));
}

/**
 * Reads intrinsic width/height from a PNG's IHDR chunk (no dependency).
 * Returns null for missing files, non-PNGs, or unreadable headers.
 */
export function readImageSize(
  publicPath: string
): { width: number; height: number } | null {
  try {
    const filePath = toFilePath(publicPath);
    if (!fs.existsSync(filePath)) return null;
    if (!filePath.toLowerCase().endsWith(".png")) return null;
    const fd = fs.openSync(filePath, "r");
    const buf = Buffer.alloc(24);
    fs.readSync(fd, buf, 0, 24, 0);
    fs.closeSync(fd);
    if (buf.readUInt32BE(0) !== 0x89504e47) return null; // PNG signature
    const width = buf.readUInt32BE(16);
    const height = buf.readUInt32BE(20);
    if (!width || !height) return null;
    return { width, height };
  } catch {
    return null;
  }
}

/**
 * Build-time guard for image sharpness. Logs a warning if a source image lacks
 * 2× horizontal headroom over the width it's displayed at — i.e. it can't stay
 * crisp on high-DPI / Retina displays. Runs whenever the server component that
 * calls it renders (during `next build` SSG and in dev).
 *
 * No-ops silently for missing or non-PNG files, so it only fires once real
 * assets are dropped in.
 */
const warnedKeys = new Set<string>();

export function warnIfLowResolution(
  publicPath: string,
  displayWidth: number,
  context: string
): void {
  const key = `${publicPath}@${displayWidth}`;
  if (warnedKeys.has(key)) return; // warn once per image per process
  const size = readImageSize(publicPath);
  if (!size) return;
  const required = displayWidth * 2;
  if (size.width < required) {
    warnedKeys.add(key);
    console.warn(
      `[image-quality] ${context}: "${publicPath}" is ${size.width}px wide but ` +
        `displays at up to ${displayWidth}px. Needs >= ${required}px for 2x ` +
        `(Retina) sharpness. Re-capture at a higher resolution.`
    );
  }
}
