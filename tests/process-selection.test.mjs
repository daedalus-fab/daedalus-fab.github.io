import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const index = readFileSync(new URL("../src/pages/index.astro", import.meta.url), "utf8");
const guide = readFileSync(new URL("../src/pages/processes.astro", import.meta.url), "utf8");

test("the home page links to the process guide on mobile and desktop", () => {
  assert.equal(index.split('href="/processes/"').length - 1, 2);
});

test("every process has planning and separate release-gate guidance", () => {
  for (const process of ["Additive", "Subtractive", "Hybrid"]) {
    assert.ok(guide.includes('name: "' + process + '"'));
  }
  assert.match(guide, /compatible machine profile/);
  assert.match(guide, /never automatically machine-ready/);
});
