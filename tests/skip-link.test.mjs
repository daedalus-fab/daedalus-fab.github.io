import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

test("homepage has an early keyboard skip link with a unique, focusable main target", async () => {
  const source = await readFile(new URL("../src/pages/index.astro", import.meta.url), "utf8");
  const skip = source.indexOf('<a class="skip-to-content" href="#main-content">Skip to main content</a>');
  const announcement = source.indexOf("<AnnouncementBar ");
  const header = source.indexOf("<header ");
  assert.ok(skip !== -1 && skip < announcement && skip < header, "skip link must be first interactive content");
  assert.equal((source.match(/id="main-content"/g) || []).length, 1);
  assert.match(source, /<main id="main-content" tabindex="-1">/);
  assert.match(source, /\.skip-to-content:focus-visible\{[^}]*transform:translateY\(0\)/);
});
