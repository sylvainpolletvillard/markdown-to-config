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
			case "space":
				setContent(conf, path, token.text || token.raw);
				break;

			default:
				console.info(`Unhandled token: ${token.type}`, token);
		}
	}

	return conf;
}

function recursivelySerializeSymbols(obj) {
	if (typeof obj !== "object" || obj == null) return obj;
	const keys = [...Object.getOwnPropertySymbols(obj), ...Object.keys(obj)];
	return Object.fromEntries(
		keys.map((key) => [
			typeof key === "symbol" ? key.toString() : key,
			recursivelySerializeSymbols(obj[key]),
		])
	);
}

export function serialize(obj, indent = "\t", includesSymbols = true) {
	if (includesSymbols) {
		obj = recursivelySerializeSymbols(obj);
	}
	return JSON.stringify(obj, null, indent);
}

