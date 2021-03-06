import { strict as assert } from "assert";
import { listKeys } from "./helpers.js";
import { markdownToConfig, CONTENT_AS_TEXT } from "../index.js";

const c1 = markdownToConfig(`
# a

## a1

a1 content

## a2

a2 content

# b

## b1

b1 content
`);

assert.strictEqual(listKeys(c1), "a,b");
assert.strictEqual(listKeys(c1.a), "a1,a2");
assert.strictEqual(c1.a.a1[CONTENT_AS_TEXT], "a1 content");
assert.strictEqual(c1.a.a2[CONTENT_AS_TEXT], "a2 content");
assert.strictEqual(listKeys(c1.b), "b1");
assert.strictEqual(c1.b.b1[CONTENT_AS_TEXT], "b1 content");

const c2 = markdownToConfig(`Top text

Middle text

# h1

h1 text

## h2

h2 text
`);

assert.strictEqual(c2[CONTENT_AS_TEXT], "Top text\n\nMiddle text");
assert.strictEqual(listKeys(c2), "h1");
assert.strictEqual(c2.h1[CONTENT_AS_TEXT], "h1 text");
assert.strictEqual(c2.h1.h2[CONTENT_AS_TEXT], "h2 text");
