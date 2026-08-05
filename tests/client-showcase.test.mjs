import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

test("homepage exposes the polyglot client workbench", async () => {
  const page = await readFile(new URL("../src/pages/index.astro", import.meta.url), "utf8");
  const component = await readFile(new URL("../src/components/ClientShowcase.astro", import.meta.url), "utf8");
  for (const expected of ["daedalus-clients", "Python", "Dart / Flutter", "TypeScript", "Rust"]) {
    assert.ok(page.includes(expected), `missing ${expected}`);
  }
  assert.match(component, /Select client language/);
  assert.match(component, /navigator\.clipboard/);
  assert.match(component, /prefers-reduced-motion/);
});
