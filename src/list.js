import { setByPath } from "./string-utils.js";
import { setContent } from "./content.js";

export const parseList = (conf, path, token) => {
	for (let item of token.items) {
		parseListItem(conf, path, item);
	}
};

const REGEX_PROP_VALUE = /(\w+):(.+)/;

export const parseListItem = (conf, path, item) => {
	const propMatch = item.text.match(REGEX_PROP_VALUE);
	if (propMatch != null) {
		let [match, key, value] = propMatch;
		setByPath(conf, [...path, key], parseValue(value));
	} else {
		setContent(conf, path, item.text);
	}
};

export const parseValue = (str) => {
	str = str.trim();
	if (Number(str).toString() === str) {
		return Number(str);
	}
	return str;
};
