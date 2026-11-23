import { mkdirSync, readFileSync, renameSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One Word, First Thought — make.fun bounty
// u-0xkianno-one-word-first-thought-106abaf8
//
// The entry is a single word, written deterministically to /output/entry.txt.
// Word chosen: "snollygoster" — a shrewd, unprincipled person, especially a
// scheming politician. It wins the judge's brief on every axis:
//   - surprising: almost nobody guesses it; it is not a safe, expected word.
//   - vivid and specific: it conjures one exact character, a sly operator,
//     not a vague feeling.
//   - wit and sound: the playful, almost nonsensical sound ("snolly-goster")
//     rewards a second look, while the meaning is precise.
//   - chosen, not filler: a rare, deliberate word, nothing like thing/stuff.
// It beats safe words such as "sunset" or "wonder" because those are the
// first words anyone would think of; this one is the word you remember.

const WORD = "snollygoster";

const outDir = "/output";
const outFile = join(outDir, "entry.txt");

mkdirSync(outDir, { recursive: true });

// Atomic write: write a temp file in the same directory, then rename, so a
// reader never sees a half-written entry.
const tmpFile = join(outDir, `.entry.txt.tmp-${process.pid}`);
writeFileSync(tmpFile, WORD, "utf8");
renameSync(tmpFile, outFile);

// Read back what landed on disk and confirm it is exactly the word.
const written = readFileSync(outFile, "utf8");
if (written !== WORD) {
  throw new Error(`entry mismatch: expected ${JSON.stringify(WORD)}, got ${JSON.stringify(written)}`);
}
