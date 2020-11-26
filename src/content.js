import marked from "marked";
import { parseKey } from "./string-utils.js";

export const HAS_CONTENT = Symbol("HAS_CONTENT");
export const CONTENT_AS_TEXT = Symbol("CONTENT_AS_TEXT");
export const CONTENT_AS_HTML = Symbol("CONTENT_AS_HTML");

export function setContent(conf, path, text, options) {
	let maxDepth = path.length;
	let depth = 0;
	let node = conf;

	while (depth < maxDepth) {
		let key = parseKey(path[depth++], options);
		if (!node.hasOwnProperty(key)) {
			node[key] = {};
		} else if (typeof node[key] !== "object") {
			node[key] = { [CONTENT_AS_TEXT]: node[key], [HAS_CONTENT]: true };
		}
		node = node[key];
	}

	addContent(node, text);
	if (node[HAS_CONTENT]) {
		node[CONTENT_AS_HTML] = marked(node[CONTENT_AS_TEXT]);
	}
}

export function addContent(node, text) {
	if (node.hasOwnProperty(CONTENT_AS_TEXT)) {
		node[CONTENT_AS_TEXT] = (node[CONTENT_AS_TEXT] + "\n\n" + text).trim();
	} else {
		node[HAS_CONTENT] = true;
		node[CONTENT_AS_TEXT] = text;
	}
}
