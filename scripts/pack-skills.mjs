#!/usr/bin/env node
/**
 * Zips every folder in content/skills/ into public/skills/<slug>.zip, the download on
 * /research/. The folder is the source; the zips are build output and aren't committed.
 */
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const source = path.join(process.cwd(), "content", "skills");
const out = path.join(process.cwd(), "public", "skills");

// Start clean: `zip` appends to an existing archive, and a removed skill must not linger.
fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out, { recursive: true });

const skills = fs.readdirSync(source, { withFileTypes: true }).filter((d) => d.isDirectory());
for (const { name } of skills) {
  execFileSync("zip", ["-r", "-q", "-X", path.join(out, `${name}.zip`), name, "-x", "*.DS_Store"], { cwd: source });
}

console.log(`Packed ${skills.length} skill(s) to public/skills/`);
