import marked from "marked"
import { parseKey } from "./string-utils.js"

export const CONTENT_AS_TEXT = Symbol("CONTENT_AS_TEXT")
export const CONTENT_AS_HTML = Symbol("CONTENT_AS_HTML")

export function markdownToConfig(md) {
	const tokens = marked.lexer(md)
	const conf = {}
	const path = []

	for (let token of tokens) {
		switch (token.type) {
			case "heading":
				const key = parseKey(token.text)

				while (path.length > token.depth - 1) {
					path.pop()
				}

				path.push(key)
				break

			case "text":
			case "paragraph":
				setContent(conf, path, token.text)
				break

			case "space":
				break

			default:
				console.info(`Unhandled token: ${token.type}`, token)
		}
	}

	return conf
}

export function setContent(conf, path, text) {
	let maxDepth = path.length
	let depth = 0
	let node = conf

	while (depth < maxDepth - 1) {
		let key = parseKey(path[depth++])
		if (!node.hasOwnProperty(key)) {
			node[key] = {}
		} else if (typeof node[key] !== "object") {
			node[key] = { [CONTENT_AS_TEXT]: node[key] }
		}
		node = node[key]
	}

	if (maxDepth === 0) {
		addContent(conf, text)
	} else {
		const key = parseKey(path[maxDepth - 1])
		if (!node.hasOwnProperty(key)) {
			node[key] = text
		} else {
			addContent(node[key], text)
		}
	}
}

export function addContent(node, text) {
	if (node.hasOwnProperty(CONTENT_AS_TEXT)) {
		node[CONTENT_AS_TEXT] += "\n\n" + text
	} else {
		node[CONTENT_AS_TEXT] = text
	}
}
