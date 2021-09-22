import { setByPath, getByPath } from "./string-utils.js";
import { setContent, HAS_CONTENT } from "./content.js";

export const parseList = (conf, path, token, options) => {
	for (let item of token.items) {
		parseListItem(conf, path, item, options);
	}
};

const REGEX_PROP_VALUE = /(^[\w\s]+):(.*)/;

export const parseListItem = (conf, path, item, options) => {
	const propMatch = item.text.match(REGEX_PROP_VALUE);
	if (propMatch != null) {
		let [match, key, value] = propMatch;
		if (
			!value &&
			item.tokens &&
			item.tokens.length === 2 &&
			item.tokens[1].type === "list"
		) {
			// sub-list
			parseList(conf, [...path, key], item.tokens[1], options);
		} else {
			// key: value
			setByPath(conf, [...path, key], parseValue(value), options);
		}
	} else {
		let node = getByPath(conf, path, options);
		if (node && node[HAS_CONTENT]) {
			setContent(conf, path, item.text);
		} else {
			// list item
			if (!Array.isArray(node)) {
				node = Object.assign([], node);
				setByPath(conf, path, node, options);
			}
			setByPath(conf, path, node, options);
			node.push(parseValue(item.text));
		}
	}
};

export const parseValue = (str) => {
	str = str.trim();
	if (Number(str).toString() === str) {
		return Number(str);
	}
	return str;
};
