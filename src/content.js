import { marked } from "marked";
import { parseKey } from "./string-utils.js";

export const HAS_CONTENT = Symbol("HAS_CONTENT");
export const CONTENT_AS_TEXT = Symbol("CONTENT_AS_TEXT");
export const CONTENT_AS_HTML = Symbol("CONTENT_AS_HTML");

export function setContent(conf, path, text, options) {
	const isEmpty = /^[\n\r\s]*$/.test(text);

	const maxDepth = path.length;
	let depth = 0;
	let node = conf;

	while (depth < maxDepth) {
		const key = parseKey(path[depth++], options);
		if (!node.hasOwnProperty(key)) {
			node[key] = {};
		} else if (typeof node[key] !== "object") {
			node[key] = {
				[CONTENT_AS_TEXT]: options.parseContent(node[key]),
				[HAS_CONTENT]: true,
			};
		}
		node = node[key];
	}

	if (!isEmpty || node[HAS_CONTENT]) addContent(node, text, options);
}

export function addContent(node, text, options) {
	if (node.hasOwnProperty(CONTENT_AS_TEXT)) {
		node[CONTENT_AS_TEXT] = options.parseContent(
			`${node[CONTENT_AS_TEXT]}\n\n${text}`,
		);
	} else {
		node[HAS_CONTENT] = true;
		node[CONTENT_AS_TEXT] = options.parseContent(text);
	}
	node[CONTENT_AS_HTML] = marked.parse(
		node[CONTENT_AS_TEXT],
		options.markedOptions,
	);
}
