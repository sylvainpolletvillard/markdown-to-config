import marked from "marked";
import { parseKey, getByPath } from "./string-utils.js";
import { setContent, HAS_CONTENT } from "./content.js";
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
			case "space":
				setContent(conf, path, token.text || token.raw);
				break;

			default:
				console.info(`Unhandled token: ${token.type}`, token);
		}
	}

	return conf;
}
