import { strict as assert } from "assert";
import { isPlainObject, listKeys } from "./helpers.js";
import { markdownToConfig } from "../index.js";

const c1 = markdownToConfig(`
# Players
- number: 4
- game: Poker

## P1
- name: Jack
- age: 22

### Cards
- A♠
- J♣
- Q♥
- K♦

## P2
- name: Jim
- age: 21

### Cards
1. 7♠
2. 7♣
3. 7♥
4. 7♦
`);

assert.ok(Array.isArray(c1.players.p1.cards));
assert.strictEqual(listKeys(c1.players.p1.cards), "0,1,2,3");
assert.strictEqual(c1.players.p1.cards.join(","), "A♠,J♣,Q♥,K♦");

assert.ok(Array.isArray(c1.players.p2.cards));
assert.strictEqual(listKeys(c1.players.p2.cards), "0,1,2,3");
assert.strictEqual(c1.players.p2.cards.join(","), "7♠,7♣,7♥,7♦");

const c2 = markdownToConfig(`
# todo
- dev:
    - nested
    - lists
- test:
    - list
    - in
    - list
`);

assert.ok(Array.isArray(c2.todo.dev));
assert.strictEqual(listKeys(c2.todo.dev), "0,1");
assert.strictEqual(c2.todo.dev.join(","), "nested,lists");
assert.ok(Array.isArray(c2.todo.test));
assert.strictEqual(listKeys(c2.todo.test), "0,1,2");
assert.strictEqual(c2.todo.test.join(","), "list,in,list");
