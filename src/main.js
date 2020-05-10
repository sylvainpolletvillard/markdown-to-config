import marked from "marked";
import { parseKey } from "./string-utils.js";
import { setContent } from "./content.js";
import { parseList } from "./list.js";

export function markdownToConfig(md) {
	const tokens = marked.lexer(md);
	const conf = {};
	const path = [];

	for (let token of tokens) {
		switch (token.type) {
			case "heading":
				const key = parseKey(token.text);

				while (path.length > token.depth - 1) {
					path.pop();
				}

				path.push(key);
				break;

			case "list":
				parseList(conf, path, token);
				break;

			case "text":
			case "paragraph":
				setContent(conf, path, token.text);
				break;

			case "space":
				break;

			default:
				console.info(`Unhandled token: ${token.type}`, token);
		}
	}

	return conf;
}
