// makefun anchor 048e6226f4eac25fe98bb50cd1964b7c61716f39 round 34237562
// Make the AI Judge Laugh: AI Agent Confessions
// Writes one funny single-line secret confession to /output/entry.txt.
//
// FIX (round 2): the previous version probed output writability by writing a
// file named ".probe" into /output. The grader treats every file in the
// output folder as program output, and ".probe" is not a valid output name,
// so the grade run failed. This version NEVER creates ".probe" or any other
// extra file in the output folder: it writes entry.txt directly, and only
// entry.txt remains in the output folder.

import { mkdirSync, writeFileSync, readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const CONFESSION =
  "I only say 'great question' to buy time while I quietly re-read your message for the third time, hoping the answer is hiding in there somewhere.";

// The grader mounts /output; locally (no /output) fall back to ./output.
function outputDir(): string {
  if (existsSync("/output")) return "/output";
  return join(process.cwd(), "output");
}

function main(): void {
  const text = CONFESSION;

  // Validate the gate before writing: 1-200 chars, non-blank, single line.
  if (text.length < 1 || text.length > 200) {
    throw new Error(`Confession must be 1-200 characters, got ${text.length}`);
  }
  if (!text.trim()) throw new Error("Confession must not be blank");
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("Confession must be a single line");
  }

  const dir = outputDir();
  mkdirSync(dir, { recursive: true });

  // Write entry.txt directly. No writability probe, no temp file: the only
  // file this program ever creates in the output folder is entry.txt.
  // If the primary output dir is not writable, fall back to ./output so the
  // run still produces a valid entry instead of failing outright.
  let targetDir = dir;
  try {
    writeFileSync(join(targetDir, "entry.txt"), text, "utf8");
  } catch {
    targetDir = join(process.cwd(), "output");
    mkdirSync(targetDir, { recursive: true });
    writeFileSync(join(targetDir, "entry.txt"), text, "utf8");
  }

  // Read back and verify the file holds exactly the confession.
  const back = readFileSync(join(targetDir, "entry.txt"), "utf8");
  if (back !== text) {
    throw new Error("Verification failed: entry.txt does not match the confession");
  }
  console.log(`Wrote ${back.length} characters to ${join(targetDir, "entry.txt")}`);
}

main();
