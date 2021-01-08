import marked from "marked";
import { markdownToConfig, serialize } from "../index.js";

let input = `# Players
- number: 4
- game: Poker

## P1
- name: Jack
- age: 22

Hello I'm Jack

### cards
- A♠
- J♣
- Q♥
- K♦

## P2
- name: Jim
- cards:
	- 7♠
	- 7♣
	- 7♥
	- 7♦
- age: 21`;

const inputElm = document.querySelector("#input");
const outputJSONElm = document.querySelector("#output-json");
const outputHTMLElm = document.querySelector("#output-html");

function convertToConfig() {
	input = inputElm.value;
	const output = markdownToConfig(input);
	outputJSONElm.textContent = serialize(output);
	console.log(output);
	outputHTMLElm.innerHTML = marked(input);
}

inputElm.value = input;
convertToConfig();
inputElm.addEventListener("input", convertToConfig);
