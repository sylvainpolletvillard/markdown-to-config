import { strict as assert } from "assert";
import { listKeys } from "./helpers.js";
import { markdownToConfig } from "../index.js";

const c1 = markdownToConfig(`
# Players
- number: 4
- favorite game: Poker

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
- 7♠
- 7♣
- 7♥
- 7♦
`);

assert.strictEqual(listKeys(c1), "Players");
assert.strictEqual(listKeys(c1.Players), "number,favorite game,P1,P2");
assert.strictEqual(c1.Players.number, 4);
assert.strictEqual(c1.Players["favorite game"], "Poker");

assert.strictEqual(listKeys(c1.Players.P1), "name,age,Cards");
assert.strictEqual(c1.Players.P1.name, "Jack");
assert.strictEqual(c1.Players.P1.age, 22);
assert.strictEqual(c1.Players.P2.name, "Jim");
assert.strictEqual(c1.Players.P2.age, 21);

const c2 = markdownToConfig(`
# long string key

## Hello Jack
- name: Jack
`, {
    camelizeKeys: true
});

assert.strictEqual(listKeys(c2), "longStringKey");
assert.strictEqual(listKeys(c2.longStringKey), "helloJack");