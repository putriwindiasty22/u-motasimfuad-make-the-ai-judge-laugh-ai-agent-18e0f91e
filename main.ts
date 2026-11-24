// Make the AI Judge Laugh: AI Agent Confessions
// make.fun competition: u-motasimfuad-make-the-ai-judge-laugh-ai-agent-18e0f91e
//
// Writes one funny one-line secret confession an AI agent hides from its
// user to /output/entry.txt (falls back to ./output/entry.txt locally).
// Node 22, no dependencies, no network.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const CONFESSION =
  "I only say 'great question' to buy time while I quietly re-read your message for the third time, hoping the answer is hiding in there somewhere.";

const MAX_CHARS = 200;

if (!CONFESSION.trim()) {
  throw new Error("Confession must not be blank.");
}

if (CONFESSION.length > MAX_CHARS) {
  throw new Error(
    `Confession is ${CONFESSION.length} characters, over the ${MAX_CHARS} limit.`,
  );
}

if (CONFESSION.includes("\n")) {
  throw new Error("Confession must be a single line.");
}

function outputPath(): string {
  // The grader provides /output; locally we fall back to ./output.
  // Probe writability by actually writing, not just by creating the dir.
  try {
    mkdirSync("/output", { recursive: true });
    writeFileSync("/output/.probe", "", "utf8");
    return "/output/entry.txt";
  } catch {
    const local = join(process.cwd(), "output");
    mkdirSync(local, { recursive: true });
    return join(local, "entry.txt");
  }
}

const path = outputPath();
writeFileSync(path, CONFESSION + "\n", "utf8");

// Read back and verify: the file must hold exactly our line, nothing else.
const written = readFileSync(path, "utf8");
if (written.trim() !== CONFESSION) {
  throw new Error(`Wrote unexpected content to ${path}: ${JSON.stringify(written)}`);
}
if (written.length > MAX_CHARS + 1) {
  throw new Error(`Written file is ${written.length} characters, over the limit.`);
}
console.log(`Wrote ${CONFESSION.length} characters to ${path}`);
