#!/usr/bin/env node
// Enforce repo-wide pinning policy for Docker images and npm dependency ranges.
// See AGENTS.md > "Pinning policy" and issue #106.

import fs from "node:fs";
import path from "node:path";

const repoRoot = process.cwd();
const violations = [];

const record = (file, line, message) => {
  violations.push({
    file: path.relative(repoRoot, file) || file,
    line,
    message,
  });
};

// ---- Docker ---------------------------------------------------------------

// Tag must start with a numeric major.minor and may continue with .patch and
// suffixes like -alpine / -slim / -bookworm. Rejects bare "17", "17-alpine",
// "latest", "x", etc.
const DOCKER_TAG_RE = /^[0-9]+\.[0-9]+(\.[0-9]+)?([.+-][A-Za-z0-9._+-]+)*$/;
const DOCKER_DIGEST_RE = /@sha256:[a-f0-9]{64}$/;

const checkDockerRef = (file, lineNo, ref) => {
  if (ref === "scratch") return;
  if (DOCKER_DIGEST_RE.test(ref)) return;
  // For host:port/image:tag, the tag colon comes after the last slash.
  const lastSlash = ref.lastIndexOf("/");
  const tagColonIdx = ref.indexOf(":", lastSlash + 1);
  if (tagColonIdx === -1) {
    record(
      file,
      lineNo,
      `image has no tag (must be major.minor[.patch] or @sha256:digest): ${ref}`,
    );
    return;
  }
  const tag = ref.slice(tagColonIdx + 1);
  if (!DOCKER_TAG_RE.test(tag)) {
    record(
      file,
      lineNo,
      `image tag must be major.minor[.patch] or @sha256:digest: ${ref}`,
    );
  }
};

const scanDockerfile = (file) => {
  const lines = fs.readFileSync(file, "utf8").split("\n");
  lines.forEach((line, i) => {
    const m = line.match(/^\s*FROM\s+(?:--platform=\S+\s+)?(\S+)/i);
    if (m) checkDockerRef(file, i + 1, m[1]);
  });
};

const scanComposeFile = (file) => {
  const lines = fs.readFileSync(file, "utf8").split("\n");
  lines.forEach((line, i) => {
    if (/^\s*#/.test(line)) return;
    const m = line.match(/^\s*image:\s*["']?([^"'\s#]+)["']?/);
    if (m) checkDockerRef(file, i + 1, m[1]);
  });
};

// ---- npm ------------------------------------------------------------------

// Allows tilde or exact pin: ~1.2.3, =1.2.3, 1.2.3, with optional prerelease/build.
const NPM_OK_RE = /^(~|=)?\d+\.\d+\.\d+(-[0-9A-Za-z.-]+)?(\+[0-9A-Za-z.-]+)?$/;

const checkNpmRange = (file, depName, range) => {
  if (typeof range !== "string") {
    record(file, 0, `${depName}: non-string range (${JSON.stringify(range)})`);
    return;
  }
  if (
    range.startsWith("workspace:") ||
    range.startsWith("link:") ||
    range.startsWith("file:") ||
    range.startsWith("git+") ||
    range.startsWith("git://") ||
    range.startsWith("git@") ||
    range.startsWith("github:") ||
    range.startsWith("http://") ||
    range.startsWith("https://")
  ) {
    return;
  }
  if (range.startsWith("npm:")) {
    const aliasSpec = range.slice(4);
    const atIdx = aliasSpec.lastIndexOf("@");
    if (atIdx <= 0) {
      record(file, 0, `${depName}: malformed npm: alias (${range})`);
      return;
    }
    const aliasVersion = aliasSpec.slice(atIdx + 1);
    if (!NPM_OK_RE.test(aliasVersion)) {
      record(
        file,
        0,
        `${depName}: aliased version must be exact or ~major.minor.patch (${range})`,
      );
    }
    return;
  }
  if (!NPM_OK_RE.test(range)) {
    record(
      file,
      0,
      `${depName}: must be exact or ~major.minor.patch (got "${range}")`,
    );
  }
};

const scanPackageJson = (file) => {
  let pkg;
  try {
    pkg = JSON.parse(fs.readFileSync(file, "utf8"));
  } catch (err) {
    record(file, 0, `failed to parse package.json: ${err.message}`);
    return;
  }
  for (const key of [
    "dependencies",
    "devDependencies",
    "peerDependencies",
    "optionalDependencies",
  ]) {
    const obj = pkg[key];
    if (!obj || typeof obj !== "object") continue;
    for (const [name, range] of Object.entries(obj)) {
      checkNpmRange(file, `${key}.${name}`, range);
    }
  }
};

// ---- Walk -----------------------------------------------------------------

const SKIP_DIRS = new Set([
  "node_modules",
  ".next",
  ".turbo",
  ".pnpm-store",
  "coverage",
  "dist",
  ".git",
  "test-results",
  "playwright-report",
]);

const walk = (dir, onFile) => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, onFile);
    else onFile(full);
  }
};

walk(repoRoot, (file) => {
  const base = path.basename(file);
  if (base === "package.json") scanPackageJson(file);
  else if (/^docker-compose.*\.ya?ml$/.test(base)) scanComposeFile(file);
  else if (base === "Dockerfile" || /^Dockerfile\..+/.test(base))
    scanDockerfile(file);
});

if (violations.length > 0) {
  console.error("Pinning policy violations:");
  for (const v of violations) {
    const loc = v.line ? `${v.file}:${v.line}` : v.file;
    console.error(`  ${loc} — ${v.message}`);
  }
  console.error(
    `\n${violations.length} violation(s). Policy: AGENTS.md > Pinning policy.`,
  );
  process.exit(1);
}

console.log("Pinning policy: OK");
