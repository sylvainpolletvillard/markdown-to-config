import { strict as assert } from "assert";
import { listKeys } from "./helpers.js";
import { markdownToConfig, CONTENT_AS_TEXT } from "../index.js";

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

- 7♠
- 7♣
- 7♥
- 7♦
`);

assert.equal(listKeys(c1), "players");
assert.equal(listKeys(c1.players), "number,game,p1,p2");
assert.equal(c1.players.number, 4);
assert.equal(c1.players.game, "Poker");

assert.equal(listKeys(c1.players.p1), "name,age,cards");
assert.equal(c1.players.p1.name, "Jack");
assert.equal(c1.players.p1.age, 22);
assert.equal(c1.players.p2.name, "Jim");
assert.equal(c1.players.p2.age, 21);

assert.equal(listKeys(c1.players.p1.cards), "");
